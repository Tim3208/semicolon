import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/**
 * 학회 조직도 카드 나오는 섹션
 * @param {Object} member 조직원 데이터
 * @returns
 */
function CardSectionCP(member) {
  /**
   * 학회원 Card 컴포넌트
   * @param {Object} member - 멤버 정보 객체
   * @returns {JSX.Element} Card 컴포넌트
   */
  const CardCP = ({ member }) => {
    return (
      <Card position={member.position}>
        <Avatar className="bg-gray-50 w-24 h-24">
          <AvatarImage
            src={member.avatar || "/placeholder.svg"}
            alt={member.name}
          />
        </Avatar>
        <div>
          <span className="name">{member.name}</span>
          {member.position && (
            <span className="position">{member.position}</span>
          )}
          {member.department && (
            <span className="department">{member.department}</span>
          )}
        </div>
        <p>{member.description || "소개글이 없습니다."}</p>
        <div className="contact">
          <p>
            <Mail />
            {member.email || "이메일 정보를 제공할 수 없습니다."}
          </p>
          <p>
            <Phone />
            {member.phone || "전화번호 정보를 제공할 수 없습니다."}
          </p>
          <p>
            <BookUser />
            {member.sid || "학번 정보를 제공할 수 없습니다."}
          </p>
          {member.github && (
            <p href={member.github}>
              <Github />
              {member.github}
            </p>
          )}
        </div>
      </Card>
    );
  };

  /** 부서별 부장/부원 추출 함수
   * @param {string} deptName 기획/홍보/총무/체육 을 str로 받음
   * @returns {Object} {head, staffs} 전달받은 부서의 부서장과 부서원들을 뱉음
   */
  const getDeptData = (deptName) => {
    const head = member.find((m) => m.position === `${deptName}부장`);
    const staffs = member.filter(
      (m) => m.department === `${deptName}부` && !m.position.endsWith("부장")
    );
    return { head, staffs };
  };

  /**
   * Card 컴포넌트 부서별로 보여주는 컴포넌트
   * @param {Object} member - 멤버 정보 객체
   */
  const CardLayoutCP = ({ member, head, staffs }) => {
    return (
      <>
        <section className="flex flex-col gap-16 items-center mt-12">
          {head && (
            <div className="flex flex-col gap-8 items-center">
              <h2 className="text-2xl font-bold">{head.position}</h2>
              <CardCP member={head} />
            </div>
          )}
          {staffs && staffs.length > 0 && (
            <div className="flex flex-col gap-8 items-center">
              {head.position === "학회장" ? (
                <h2 className="text-2xl font-bold">임원</h2>
              ) : (
                <h2 className="text-2xl font-bold">부원</h2>
              )}
              <div className="flex flex-wrap gap-8 justify-center">
                {staffs.map((m) => (
                  <CardCP key={m.id} member={m} />
                ))}
              </div>
            </div>
          )}
        </section>
      </>
    );
  };
  //부서별 부장&부원 데이터
  const planningDept = getDeptData("기획");
  const prDept = getDeptData("홍보");
  const financeDept = getDeptData("총무");
  const sportDept = getDeptData("체육");

  // 임원진(학회장 + 부장들)
  const president = member.find((m) => m.position === "학회장");
  const heads = member.filter((m) => m.position.endsWith("부장"));

  return (
    <Tabs defaultValue="leader" className="mt-16 flex flex-col justify-center">
      <TabsList className="bg-white flex gap-2">
        <TabsTrigger
          className="w-24 bg-orange-200 data-[state=active]:bg-orange-400"
          value="leader"
        >
          임원진
        </TabsTrigger>
        <TabsTrigger
          className="w-24 bg-orange-200 data-[state=active]:bg-orange-400"
          value="planningDept"
        >
          기획부
        </TabsTrigger>
        <TabsTrigger
          className="w-24 bg-orange-200 data-[state=active]:bg-orange-400"
          value="prDept"
        >
          홍보부
        </TabsTrigger>
        <TabsTrigger
          className="w-24 bg-orange-200 data-[state=active]:bg-orange-400"
          value="financeDept"
        >
          총무부
        </TabsTrigger>
        <TabsTrigger
          className="w-24 bg-orange-200 data-[state=active]:bg-orange-400"
          value="sportDept"
        >
          체육부
        </TabsTrigger>
      </TabsList>
      <TabsContent value="leader">
        <CardLayoutCP head={president} staffs={heads} />
      </TabsContent>
      <TabsContent value="planningDept">
        <CardLayoutCP head={planningDept.head} staffs={planningDept.staffs} />
      </TabsContent>
      <TabsContent value="prDept">
        <CardLayoutCP head={prDept.head} staffs={prDept.staffs} />
      </TabsContent>
      <TabsContent value="financeDept">
        <CardLayoutCP head={financeDept.head} staffs={financeDept.staffs} />
      </TabsContent>
      <TabsContent value="sportDept">
        <CardLayoutCP head={sportDept.head} staffs={sportDept.staffs} />
      </TabsContent>
    </Tabs>
  );
}
export default CardSectionCP;
