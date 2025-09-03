import MainLayOut from "@/layout/MainLayout";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "./style";
import { Mail, GithubIcon, Phone } from "lucide-react";
import { useState } from "react";
import { member } from "@/_dummyData/memberData";

const leaders = member.filter(
  (m) => m.position.endsWith("부장") || m.position === "학회장"
);
const staffs = member.filter(
  (m) => m.position && !m.position.endsWith("부장") && m.position !== "학회장"
);

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
        {member.position && <span className="position">{member.position}</span>}
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
        {member.github && (
          <p href={member.github} target="_blank" rel="noreferrer">
            <GithubIcon />
            {member.github}
          </p>
        )}
      </div>
    </Card>
  );
};

/**
 * 축소형 학회원 Card 컴포넌트
 * @param {Object} member - 멤버 정보 객체
 * @returns {JSX.Element} Card 컴포넌트
 */
const SmallCardCP = ({ member }) => {
  return (
    <>
      <></>
    </>
  );
};

function OrganizationPage() {
  const [isExpanded, setIsExpanded] = useState(true);
  return (
    <MainLayOut>
      <div className="flex justify-center items-center w-full">
        <div className="max-w-1440 py-16">
          {/* 학회 조직도 Title */}
          <div className="flex flex-col gap-4 items-center">
            <h1 className="text-4xl font-bold">학회 조직도</h1>
            <p className="text-lg text-gray-90">
              세미콜론 학회를 이끌어가는 임원진을 소개합니다.
            </p>
          </div>

          <button
            onClick={() => setIsExpanded((prev) => !prev)}
            aria-label={isExpanded ? "목록 접기" : "목록 펼치기"}
          >
            {isExpanded ? "−" : "+"}
          </button>

          {isExpanded && (
            <div className="cardsContainer">
              {member.map((m) => (
                <SmallCardCP key={m.id} member={m} />
              ))}
            </div>
          )}

          {/* 학회 조직도 Cards */}
          <section className="flex flex-col gap-16 items-center mt-12">
            <div className="flex flex-col gap-8 items-center">
              <h2 className="text-2xl font-bold">임원진</h2>
              <CardCP member={member[0]} />
            </div>
            <div className="flex flex-col gap-8 items-center">
              <h2 className="text-2xl font-bold">부서장</h2>
              <div className="flex flex-wrap gap-8 justify-center">
                <CardCP member={member[1]} />
                <CardCP member={member[2]} />
                <CardCP member={member[3]} />
                <CardCP member={member[4]} />
              </div>
            </div>
            <div className="flex flex-col gap-8 items-center">
              <h2 className="text-2xl font-bold">부서원</h2>
              <div className="flex flex-wrap gap-8 justify-center">
                {staffs.map((m) => (
                  <CardCP key={m.id} member={m} />
                ))}
              </div>
            </div>
          </section>

          {/* 조직 구조도 */}
          <section className="mt-16 py-8 mx-4 md:mx-0 bg-orange-100 rounded-lg">
            <h2 className="text-2xl font-bold text-center ">조직 구조</h2>
            <div className="rounded-lg p-8">
              <div className="flex flex-col items-center space-y-8">
                {/* 학회장 */}
                <div className="text-center">
                  <div className="w-24 md:w-48 bg-primary text-white px-6 py-3 rounded-lg font-bold">
                    학회장
                  </div>
                </div>

                <div className="w-px h-8 bg-gray-70 mx-auto"></div>

                {/* 부장 및 부서: 기획부, 홍보부, 총무부, 체육부 */}
                <div className="grid grid-cols-4 gap-8 w-full text-center">
                  <div className="flex flex-col items-center gap-8">
                    <div className="w-24 md:w-48 bg-orange-400 text-white px-4 py-2 rounded-lg font-semibold">
                      기획부장
                    </div>
                    <div className="w-px h-8 bg-gray-70"></div>
                    <div className="w-24 md:w-48 bg-orange-400/90 text-white px-4 py-2 rounded-lg font-medium">
                      기획부
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-8">
                    <div className="w-24 md:w-48 bg-orange-400 text-white px-4 py-2 rounded-lg font-semibold">
                      홍보부장
                    </div>
                    <div className="w-px h-8 bg-gray-70"></div>
                    <div className="w-24 md:w-48 bg-orange-400/90 text-white px-4 py-2 rounded-lg font-medium">
                      홍보부
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-8">
                    <div className="w-24 md:w-48 bg-orange-400 text-white px-4 py-2 rounded-lg font-semibold">
                      총무부장
                    </div>
                    <div className="w-px h-8 bg-gray-70"></div>
                    <div className="w-24 md:w-48 bg-orange-400/90 text-white px-4 py-2 rounded-lg font-medium">
                      총무부
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-8">
                    <div className="w-24 md:w-48 bg-orange-400 text-white px-4 py-2 rounded-lg font-semibold">
                      체육부장
                    </div>
                    <div className="w-px h-8 bg-gray-70"></div>
                    <div className="w-24 md:w-48 bg-orange-400/90 text-white px-4 py-2 rounded-lg font-medium">
                      체육부
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </MainLayOut>
  );
}
export default OrganizationPage;
