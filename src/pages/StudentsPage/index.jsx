import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, Plus, UserCheck, UserX, Edit, Trophy } from "lucide-react";
import MainLayOut from "@/layout/MainLayout";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function StudentsPage() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const statsRef = useRef(null);
  const listRef = useRef(null);
  const sentinelRef = useRef(null);

  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(0);
  const pageSize = 8;
  const [hasMore, setHasMore] = useState(true);
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    student_id: "",
    cohort: "",
    amount: 280000,
  });

  // 모달 관련 상태
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    name: "",
    description: "",
    date: "",
  });
  const [events, setEvents] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [paidCount, setPaidCount] = useState(0);

  // 페이지 단위 학생 조회
  const fetchStudentsPage = async (pageIndex = 0, term = "") => {
    const from = pageIndex * pageSize;
    const to = from + pageSize - 1;
    let query = supabase
      .from("students")
      .select(`*, student_events(*, events(*))`)
      .order("created_at", { ascending: true })
      .range(from, to);
    if (term && term.trim() !== "") {
      query = query.or(`name.ilike.%${term}%,student_id.ilike.%${term}%`);
    }
    const { data, error } = await query;
    if (error) {
      console.error(error);
      return [];
    }
    return data || [];
  };

  // 카운트/이벤트는 1회 로드
  const fetchCountsAndEvents = async () => {
    const [{ count: total }, { count: paid }, { data: eventsData }] =
      await Promise.all([
        supabase.from("students").select("*", { count: "exact", head: true }),
        supabase
          .from("students")
          .select("*", { count: "exact", head: true })
          .gt("amount", 0),
        supabase.from("events").select("*").order("date", { ascending: true }),
      ]);
    setTotalStudents(total || 0);
    setPaidCount(paid || 0);
    setEvents(eventsData || []);
  };

  useEffect(() => {
    setLoading(true);
    fetchCountsAndEvents();
    fetchStudentsPage(0, searchTerm).then((data) => {
      setStudents(data);
      setHasMore(data.length === pageSize);
      setPage(1);
      setLoading(false);
    });
  }, []);

  // 검색어 변경 시 초기화 후 첫 페이지 로드
  useEffect(() => {
    setLoading(true);
    setStudents([]);
    setHasMore(true);
    setPage(0);
    fetchStudentsPage(0, searchTerm).then((data) => {
      setStudents(data);
      setHasMore(data.length === pageSize);
      setPage(1);
      setLoading(false);
    });
  }, [searchTerm]);

  // 무한 스크롤 옵저버
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && hasMore && !loading && !loadingMore) {
          setLoadingMore(true);
          fetchStudentsPage(page, searchTerm).then((data) => {
            setStudents((prev) => [...prev, ...data]);
            setHasMore(data.length === pageSize);
            setPage((p) => p + 1);
            setLoadingMore(false);
          });
        }
      },
      { root: null, rootMargin: "200px", threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hasMore, loading, loadingMore, page, searchTerm]);

  // Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: -40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }
      );

      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: { trigger: statsRef.current, start: "top 85%" },
          }
        );
      }

      if (listRef.current) {
        gsap.fromTo(
          listRef.current.querySelectorAll("[data-student-card]"),
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: { trigger: listRef.current, start: "top 85%" },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  /** 학생 추가 */
  const handleAddStudent = async () => {
    if (!newStudent.name || !newStudent.student_id)
      return alert("이름과 학번은 필수입니다!");

    const { error } = await supabase.from("students").insert([
      {
        name: newStudent.name,
        student_id: newStudent.student_id,
        cohort: parseInt(newStudent.cohort || "0"),
        amount: parseInt(newStudent.amount || "0"),
      },
    ]);

    if (error) {
      console.error("Insert error:", error);
      alert("추가 실패");
    } else {
      alert("학생이 추가되었습니다.");
      setNewStudent({ name: "", student_id: "", cohort: "", amount: 280000 });
      setIsAddingStudent(false);
      fetchAllData();
    }
  };

  /** 이벤트 추가 */
  const handleAddEvent = async () => {
    if (!newEvent.name) return alert("이벤트 이름을 입력하세요.");

    const { data: event, error } = await supabase
      .from("events")
      .insert([
        {
          name: newEvent.name,
          description: newEvent.description,
          date: newEvent.date,
        },
      ])
      .select()
      .single();

    if (error) return alert("이벤트 추가 실패");

    // 모든 학생에게 기본 is_winner = false 설정
    const inserts = students.map((s) => ({
      student_id: s.id,
      event_id: event.id,
      is_winner: false,
    }));
    await supabase.from("student_events").insert(inserts);

    setIsAddEventOpen(false);
    setNewEvent({ name: "", description: "", date: "" });
    fetchAllData(); // 다시 불러오기
  };

  /** 저장함수 */
  const handleSaveStudent = async () => {
    const s = selectedStudent;

    // 1️⃣ 학회비 금액 업데이트
    await supabase.from("students").update({ amount: s.amount }).eq("id", s.id);

    // 2️⃣ 이벤트 당첨 상태 업데이트
    const updates = Object.entries(s.events || {}).map(
      ([eventId, isWinner]) => ({
        student_id: s.id,
        event_id: eventId,
        is_winner: isWinner,
      })
    );

    await supabase
      .from("student_events")
      .upsert(updates, { onConflict: ["student_id", "event_id"] });

    setIsEditOpen(false);
    setSelectedStudent(null);
    fetchAllData();
  };

  // 서버 페이징/검색을 사용하므로 별도 클라이언트 필터는 제거

  return (
    <MainLayOut>
      <main
        ref={containerRef}
        className="min-h-screen bg-[#FFF7e0] px-4 pt-28 pb-20"
      >
        {/* Header */}
        <section className="text-center mb-14">
          <h1
            ref={titleRef}
            className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FDC830] to-[#F37335] mb-4 tracking-tight"
          >
            STUDENTS
          </h1>
          <p className="text-gray-600 text-lg">
            실시간 학회비 명단과 이벤트 수상 정보를 확인하세요.
          </p>
        </section>

        {/* 통계 */}
        <section
          ref={statsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
        >
          <Card className="rounded-2xl border-2 border-[#FDC830]/40 bg-white/90 backdrop-blur-sm shadow-[0_10px_30px_-12px_rgba(243,115,53,0.15)]">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold">
                {totalStudents}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">총 학생 수</p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-2 border-[#FDC830]/40 bg-white/90 backdrop-blur-sm shadow-[0_10px_30px_-12px_rgba(243,115,53,0.15)]">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-green-600">
                {paidCount}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">납부 완료</p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-2 border-[#FDC830]/40 bg-white/90 backdrop-blur-sm shadow-[0_10px_30px_-12px_rgba(243,115,53,0.15)]">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-red-600">
                {totalStudents - paidCount}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">미납</p>
            </CardContent>
          </Card>
        </section>

        {/* 검색창 + 추가 */}
        <section className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="이름 또는 학번으로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-full border-2 border-[#FDC830]/50 bg-white/90 backdrop-blur-sm"
            />
          </div>

          <Dialog open={isAddingStudent} onOpenChange={setIsAddingStudent}>
            <DialogTrigger asChild>
              <Button className="rounded-full bg-gradient-to-r from-[#FDC830] to-[#F37335] hover:from-[#FDC830] hover:to-[#F37335]">
                <Plus className="w-4 h-4 mr-2" />
                학생 추가
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>새 학생 추가</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>이름</Label>
                  <Input
                    value={newStudent.name}
                    onChange={(e) =>
                      setNewStudent({ ...newStudent, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>학번</Label>
                  <Input
                    value={newStudent.student_id}
                    onChange={(e) =>
                      setNewStudent({
                        ...newStudent,
                        student_id: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>학번년도</Label>
                  <Input
                    value={newStudent.cohort}
                    onChange={(e) =>
                      setNewStudent({ ...newStudent, cohort: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>납부 금액</Label>
                  <Input
                    type="number"
                    value={newStudent.amount}
                    onChange={(e) =>
                      setNewStudent({ ...newStudent, amount: e.target.value })
                    }
                  />
                </div>
                <Button onClick={handleAddStudent} className="w-full">
                  추가하기
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          {/* 이벤트 추가 */}
          <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="rounded-full border-2 border-[#FDC830]/60 hover:bg-[#FFF7e0]"
              >
                <Plus className="w-4 h-4 mr-2" />
                이벤트 추가
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>새 이벤트 추가</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>이벤트 이름</Label>
                  <Input
                    value={newEvent.name}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>설명</Label>
                  <Input
                    value={newEvent.description}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, description: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>날짜</Label>
                  <Input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, date: e.target.value })
                    }
                  />
                </div>
                <Button onClick={handleAddEvent} className="w-full">
                  추가하기
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </section>

        {/* 학생 리스트 */}
        {loading ? (
          <p className="text-center py-12">불러오는 중...</p>
        ) : (
          <section ref={listRef} className="space-y-4">
            {students.map((student) => (
              <Card
                key={student.id}
                data-student-card
                className="rounded-2xl border-2 border-[#FDC830]/30 bg-white/90 backdrop-blur-sm hover:shadow-[0_18px_40px_-16px_rgba(243,115,53,0.25)] transition-all"
              >
                <CardContent className="p-6 flex flex-col justify-between items-start gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">{student.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {student.student_id}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {student.cohort}학번
                    </p>
                  </div>

                  <Button
                    variant={
                      student.membership_paid > 0 ? "default" : "destructive"
                    }
                    size="sm"
                    className="min-w-[120px] rounded-full"
                  >
                    {student.membership_paid > 0 ? (
                      <>
                        <UserCheck className="w-4 h-4 mr-2" />
                        납부 완료
                      </>
                    ) : (
                      <>
                        <UserX className="w-4 h-4 mr-2" />
                        미납
                      </>
                    )}
                  </Button>
                  <div className="flex flex-wrap gap-2">
                    {student.student_events
                      ?.filter((se) => se.is_winner)
                      .map((se) => (
                        <Button
                          key={se.events.id}
                          size="sm"
                          className="rounded-full bg-[#b8860b] hover:bg-[#b8860b]/90 text-white text-sm font-semibold flex items-center gap-1 px-4 py-2"
                        >
                          <Trophy className="w-4 h-4" />
                          {se.events.name} ✓
                        </Button>
                      ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedStudent(student);
                      setIsEditOpen(true);
                    }}
                    className="rounded-full border-2 border-[#FDC830]/60 hover:bg-[#FFF7e0]"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
            {/* Sentinel for infinite scroll */}
            <div ref={sentinelRef} />
            {loadingMore && (
              <p className="text-center text-gray-500 py-4">로딩 중…</p>
            )}
          </section>
        )}

        {students.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">검색 결과가 없습니다.</p>
          </div>
        )}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent>
            {selectedStudent && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedStudent.name} 정보 수정</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  <div>
                    <Label className="font-semibold">학회비 납부 상태</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <Checkbox
                        checked={selectedStudent.amount > 0}
                        onCheckedChange={(checked) =>
                          setSelectedStudent({
                            ...selectedStudent,
                            amount: checked ? 280000 : 0,
                          })
                        }
                      />
                      <Label>납부 완료</Label>
                    </div>
                  </div>

                  <div>
                    <Label className="font-semibold">이벤트 당첨 상태</Label>
                    <div className="space-y-2 mt-2">
                      {events.map((ev) => (
                        <div key={ev.id} className="flex items-center gap-2">
                          <Checkbox
                            checked={selectedStudent.events?.[ev.id] || false}
                            onCheckedChange={(checked) =>
                              setSelectedStudent({
                                ...selectedStudent,
                                events: {
                                  ...selectedStudent.events,
                                  [ev.id]: checked,
                                },
                              })
                            }
                          />
                          <Label>{ev.name}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button onClick={handleSaveStudent} className="w-full">
                    저장하기
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </MainLayOut>
  );
}
