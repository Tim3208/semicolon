import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MainLayOut from "@/layout/MainLayout";
import { Calendar, Camera, BookOpen, Code, FolderOpen } from "lucide-react";

export default function HomePage() {
  return (
    <MainLayOut>
      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            컴퓨터공학과 세미콜론 학회에
            <br />
            오신 것을 환영합니다.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            함께 성장하고 배우며, 미래의 개발자로 나아가는 여정을 시작해보세요.
          </p>
          <Button size="lg" className="text-lg px-8 py-3 text-white">
            학회 가입신청
          </Button>
        </section>

        {/* Feature Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-6 h-6 text-primary" />
                <CardTitle>일정</CardTitle>
              </div>
              <CardDescription>다가오는 일정:</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• 일정1</li>
                <li>• 일정2</li>
              </ul>
              <Button variant="outline" className="mt-4 bg-transparent">
                Learn more
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="w-6 h-6 text-primary" />
                <CardTitle>우리들의 추억 공유 📚</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                업로드 및 공유 기능을 담고 있어요. 나만의 특별한 이야기를 여러
                사람들과 공유하고 진정한 커뮤니티를 만들어 가기로 해요!
              </p>
              <Button variant="outline">Learn more</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Code className="w-6 h-6 text-primary" />
                <CardTitle>진행중인 프로젝트</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• 프로젝트1 (~12.31)</li>
                <li>• 프로젝트2 (~기간)</li>
              </ul>
              <Button variant="outline" className="mt-4 bg-transparent">
                Learn more
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <FolderOpen className="w-6 h-6 text-primary" />
                <CardTitle>유용한 자료실</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                선배들이 남긴 족보, 과제 코드, 그 외에도 도움이 될만한 모든 것들
                보이는 아카이브. 도움이 될 것 같다 하면 여기에 남겨 놓기로 해요.
              </p>
              <Button variant="outline">Learn more</Button>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="text-center mt-16 py-12 bg-muted rounded-lg">
          <h2 className="text-3xl font-bold mb-4">함께 성장해요</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            세미콜론 학회에서 동료들과 함께 프로젝트를 진행하고, 지식을 공유하며
            개발자로서의 역량을 키워나가세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">학회 가입 신청</Button>
            <Button variant="outline" size="lg">
              더 알아보기
            </Button>
          </div>
        </section>
      </main>
    </MainLayOut>
  );
}
