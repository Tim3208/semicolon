import React, { useEffect, useRef } from "react";
import MainLayOut from "@/layout/MainLayout";
import CardSectionCP from "@/components/OrganizationPageCP/CardCP";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const OrganizationPage = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title Animation
      gsap.fromTo(
        titleRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );

      // Chart Animation
      gsap.fromTo(
        chartRef.current.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: chartRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <MainLayOut>
      <div
        ref={containerRef}
        className="min-h-screen bg-[#FFF7e0] pt-32 pb-20 px-4 overflow-hidden"
      >
        {/* Title Section */}
        <div className="text-center mb-20">
          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FDC830] to-[#F37335] mb-6 drop-shadow-sm tracking-tight"
          >
            ORGANIZATION
          </h1>
          <p className="text-gray-600 text-lg font-medium tracking-wide">
            Semicolon 학회 조직도
          </p>
        </div>

        {/* Organization Chart Section */}
        <div ref={chartRef} className="max-w-5xl mx-auto mb-32 relative">
          <div className="flex flex-col items-center gap-16 relative z-10">
            {/* President */}
            <div className="relative group z-20">
              <div className="w-56 h-20 rounded-2xl -mt-4 bg-gradient-to-r from-[#FDC830] to-[#F37335] flex items-center justify-center shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-1">
                <span className="text-white font-bold text-2xl tracking-widest">
                  학회장
                </span>
              </div>
              {/* Connecting Line */}
              <div className="absolute top-16 left-1/2 w-1 md:h-4 h-12 bg-gradient-to-b from-[#F37335] to-[#FDC830] -translate-x-1/2 opacity-80"></div>
            </div>

            {/* Departments */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 w-full relative">
              {/* Horizontal Line connecting departments (flush between first & last centers) */}
              <div className="absolute -top-12 left-[11%] w-[78%] h-[3px] bg-[#FDC830] hidden md:block opacity-90 rounded-full"></div>

              {/* Vertical lines for each dept */}
              {["기획부", "홍보부", "총무부", "체육부"].map((dept, index) => (
                <div
                  key={dept}
                  className="flex flex-col items-center relative group"
                >
                  <div className="absolute -top-12 w-[3px] h-12 bg-[#FDC830] hidden md:block opacity-90"></div>
                  <div className="w-full h-16 rounded-xl relative overflow-hidden bg-white/80 backdrop-blur-sm border-2 border-[#FDC830] flex items-center justify-center shadow-md transition-all duration-400 ease-in-out group-hover:border-transparent group-hover:shadow-xl group-hover:-translate-y-1 cursor-default">
                    {/* Gradient overlay that fades in smoothly and fills edges */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#FDC830] to-[#F37335] opacity-0 transition-opacity duration-400 ease-in-out group-hover:opacity-100"></div>
                    <span className="relative z-10 text-[#F37335] font-bold text-xl transition-colors duration-400 ease-in-out group-hover:text-white">
                      {dept}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Members Section */}
        <div className="max-w-7xl mx-auto">
          <CardSectionCP />
        </div>
      </div>
    </MainLayOut>
  );
};

export default OrganizationPage;
