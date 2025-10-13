import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, Plus, UserCheck, UserX } from "lucide-react";
import MainLayOut from "@/layout/MainLayout";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    student_id: "",
    cohort: "",
    amount: 280000,
  });

  // 데이터 불러오기
  const fetchStudents = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("dues_paid")
      .select("id, name, student_id, cohort, amount")
      .order("cohort", { ascending: false });

    if (error) console.error("Fetch Error:", error);
    else setStudents(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // 학생 추가
  const handleAddStudent = async () => {
    if (!newStudent.name || !newStudent.student_id)
      return alert("이름과 학번은 필수입니다!");

    const { error } = await supabase.from("dues_paid").insert([
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
      fetchStudents();
    }
  };

  // ✅ 검색 필터
  const filtered = students.filter(
    (s) => s.name.includes(searchTerm) || s.student_id.includes(searchTerm)
  );

  const paidCount = students.filter((s) => s.amount > 0).length;
  const totalStudents = students.length;

  return (
    <MainLayOut>
      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">학회비 납부자 조회 시스템</h1>
          <p className="text-muted-foreground">
            Supabase에 연동된 실시간 학회비 명단을 조회할 수 있습니다.
          </p>
        </section>

        {/* 통계 */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold">
                {totalStudents}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">총 학생 수</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-green-600">
                {paidCount}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">납부 완료</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-red-600">
                {totalStudents - paidCount}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">미납</p>
            </CardContent>
          </Card>
        </section>

        {/* 검색창 + 추가 */}
        <section className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="이름 또는 학번으로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Dialog open={isAddingStudent} onOpenChange={setIsAddingStudent}>
            <DialogTrigger asChild>
              <Button>
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
        </section>

        {/* 학생 리스트 */}
        {loading ? (
          <p className="text-center py-12">불러오는 중...</p>
        ) : (
          <section className="space-y-4">
            {filtered.map((student) => (
              <Card
                key={student.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
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
                    variant={student.amount > 0 ? "default" : "destructive"}
                    size="sm"
                    className="min-w-[120px]"
                  >
                    {student.amount > 0 ? (
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
                </CardContent>
              </Card>
            ))}
          </section>
        )}

        {filtered.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">검색 결과가 없습니다.</p>
          </div>
        )}
      </main>
    </MainLayOut>
  );
}
