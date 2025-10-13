import MainLayOut from "@/layout/MainLayout";
import CardSectionCP from "@/components/OrganizationPageCP/CardCP";
import { useState } from "react";
import { member } from "@/_dummyData/memberData";

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

          {/* 학회 조직도 Cards */}
          <CardSectionCP />

          {/* 조직 구조도 */}
          <section className="mt-32 py-8 mx-4 md:mx-0 bg-orange-100 rounded-lg">
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
