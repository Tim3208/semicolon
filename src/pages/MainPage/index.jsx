import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MainLayOut from "@/layout/MainLayout";
import { Calendar, BookOpen, Code, FolderOpen, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const heroRef = useRef(null);
  const cardsRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation
      const tl = gsap.timeline();

      // Initial state is set via CSS classes (opacity-0 translate-y-8)
      // We animate TO the visible state
      tl.to(titleRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      })
        .to(
          descRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .to(
          btnRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4"
        );

      // Cards Animation with ScrollTrigger
      if (cardsRef.current && cardsRef.current.children.length > 0) {
        // Initial state is set via CSS classes (opacity-0 translate-y-12) on the wrapper div
        gsap.to(cardsRef.current.children, {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none none",
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <MainLayOut>
      <div className="min-h-screen bg-gradient-to-b from-[#fff7e0] to-[#ffdecd] dark:from-slate-950 dark:to-slate-900 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-cyan-400/10 blur-[100px]" />
          <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-violet-400/10 blur-[100px]" />
          <div className="absolute -bottom-[10%] left-[20%] w-[60%] h-[40%] rounded-full bg-fuchsia-400/10 blur-[100px]" />
        </div>

        <main className="container mx-auto px-4 py-20 relative z-10">
          {/* Hero Section */}
          <section ref={heroRef} className="text-center mb-32 pt-10">
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-slate-800 backdrop-blur-sm animate-fade-in-up">
              <span className="text-sm font-medium bg-gradient-to-r from-[#FDC830] to-[#F37335] bg-clip-text text-transparent">
                Future Developers Community
              </span>
            </div>

            <h1
              ref={titleRef}
              className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-8 leading-tight opacity-0 translate-y-8"
            >
              컴퓨터공학과{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FDC830] to-[#F37335]">
                세미콜론
              </span>{" "}
              학회에
              <br />
              오신 것을 환영합니다.
            </h1>

            <p
              ref={descRef}
              className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed opacity-0 translate-y-8"
            >
              함께 성장하고 배우며, 미래의 개발자로 나아가는 여정을
              시작해보세요.
              <br className="hidden md:block" />
              우리는 코드 한 줄, 세미콜론 하나에 열정을 담습니다.
            </p>

            <div ref={btnRef} className="opacity-0 translate-y-8">
              <Button
                size="lg"
                className="text-lg px-8 py-6 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:scale-105 transition-transform duration-300 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20"
              >
                학회 가입신청 <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </section>

          {/* Feature Cards */}
          <section
            ref={cardsRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto perspective-1000"
          >
            <FeatureCard
              icon={<Calendar className="w-8 h-8 text-cyan-500" />}
              title="주요 일정"
              description="다가오는 학회 일정과 행사를 확인하세요."
              items={["12월 생일이벤트 (기간 미정)", "종강 총회"]}
              gradient="from-cyan-500/10 to-blue-500/10"
              border="group-hover:border-cyan-500/50"
            />

            <FeatureCard
              icon={<BookOpen className="w-8 h-8 text-violet-500" />}
              title="추억 공유"
              description="나만의 특별한 이야기를 공유하고 진정한 커뮤니티를 만들어가요."
              content="활동 사진, 후기, 그리고 우리들의 소중한 순간들을 기록합니다."
              gradient="from-violet-500/10 to-purple-500/10"
              border="group-hover:border-violet-500/50"
            />

            <FeatureCard
              icon={<Code className="w-8 h-8 text-fuchsia-500" />}
              title="진행중인 프로젝트"
              description="학회원들이 진행하고 있는 멋진 프로젝트들을 소개합니다."
              items={["프로젝트1 (~12.31)", "프로젝트2 (~01.15)"]}
              gradient="from-fuchsia-500/10 to-pink-500/10"
              border="group-hover:border-fuchsia-500/50"
            />

            <FeatureCard
              icon={<FolderOpen className="w-8 h-8 text-emerald-500" />}
              title="아카이브"
              description="선배들의 노하우와 학습 자료가 모여있는 보물창고입니다."
              content="족보, 과제 코드, 스터디 자료 등 학습에 필요한 모든 것을 찾아보세요."
              gradient="from-emerald-500/10 to-teal-500/10"
              border="group-hover:border-emerald-500/50"
            />
          </section>
        </main>
      </div>
    </MainLayOut>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  items,
  content,
  gradient,
  border,
}) {
  return (
    <div className="opacity-0 translate-y-12 feature-card-wrapper">
      <Card
        className={`group relative overflow-hidden border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${border} h-full`}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />

        <CardHeader className="relative z-10">
          <div className="mb-4 p-3 w-fit rounded-2xl bg-white dark:bg-slate-800 shadow-sm group-hover:scale-110 transition-transform duration-500">
            {icon}
          </div>
          <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:to-slate-600 dark:group-hover:from-white dark:group-hover:to-slate-300 transition-colors">
            {title}
          </CardTitle>
          <CardDescription className="text-base mt-2">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="relative z-10">
          {items ? (
            <ul className="space-y-3 mb-6">
              {items.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center text-sm text-slate-600 dark:text-slate-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mr-2" />
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              {content}
            </p>
          )}

          <Button
            variant="ghost"
            className="group/btn p-0 hover:bg-transparent text-slate-900 dark:text-white font-semibold"
          >
            자세히 보기
            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
