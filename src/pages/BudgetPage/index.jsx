import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, ExternalLink, Calculator } from "lucide-react";
import MainLayOut from "@/layout/MainLayout";
import {
  PageContainer,
  Header,
  Title,
  Subtitle,
  MainContent,
  BudgetDisplay,
  Amount,
  SectionTitle,
  ExpenditureList,
  ExpenditureItem,
  SimulationSection,
} from "./style";

const BudgetPage = () => {
  // Initial Budget State (Example: 1,000,000 KRW)
  const [initialBudget] = useState(1000000);

  // Expenditures State
  const [expenditures, setExpenditures] = useState([
    {
      id: 1,
      date: "2023-11-01",
      purpose: "기말고사 응원 상품 구매",
      amount: 450000,
      link: "#",
    },
    {
      id: 2,
      date: "2023-11-05",
      purpose: "이스포츠 대회 상금 지급",
      amount: 100000,
      link: "#",
    },
  ]);

  // New Expenditure Input State
  const [newExp, setNewExp] = useState({
    date: "",
    purpose: "",
    amount: "",
    link: "",
  });

  // Simulation State
  const [simItems, setSimItems] = useState([{ id: 1, item: "", cost: "" }]);

  // Helper function to evaluate mathematical expressions
  const evaluateExpression = (expr) => {
    try {
      // Remove any non-math characters except numbers, operators, parentheses, and dots
      const sanitized = expr.replace(/[^0-9+\-*/().\s]/g, "");
      if (!sanitized) return "";

      // Use Function constructor as a safer alternative to eval
      const result = Function(`"use strict"; return (${sanitized})`)();

      // Check if result is a valid number
      if (isNaN(result) || !isFinite(result)) return expr;

      return Math.round(result).toString();
    } catch (e) {
      // If evaluation fails, return original expression
      return expr;
    }
  };

  // Derived State
  const totalSpent = expenditures.reduce((acc, curr) => acc + curr.amount, 0);
  const currentBudget = initialBudget - totalSpent;

  const handleAddExpenditure = () => {
    if (!newExp.date || !newExp.purpose || !newExp.amount) return;
    const evaluatedAmount = evaluateExpression(newExp.amount);
    const newItem = {
      id: Date.now(),
      date: newExp.date,
      purpose: newExp.purpose,
      amount: parseInt(evaluatedAmount),
      link: newExp.link,
    };
    setExpenditures([...expenditures, newItem]);
    setNewExp({ date: "", purpose: "", amount: "", link: "" });
  };

  const handleDeleteExpenditure = (id) => {
    setExpenditures(expenditures.filter((item) => item.id !== id));
  };

  const handleAddSimItem = () => {
    setSimItems([...simItems, { id: Date.now(), item: "", cost: "" }]);
  };

  const handleRemoveSimItem = (id) => {
    if (simItems.length > 1) {
      setSimItems(simItems.filter((item) => item.id !== id));
    }
  };

  const handleSimItemChange = (id, field, value) => {
    setSimItems(
      simItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const totalSimCost = simItems.reduce((acc, curr) => {
    const evaluatedCost = evaluateExpression(curr.cost);
    return acc + (parseInt(evaluatedCost) || 0);
  }, 0);
  const simulatedRemaining = currentBudget - totalSimCost;

  const handleAddSimToExpenditure = () => {
    const today = new Date().toISOString().split("T")[0];
    const validItems = simItems.filter((item) => {
      const evaluatedCost = evaluateExpression(item.cost);
      return item.item.trim() && item.cost && parseInt(evaluatedCost) > 0;
    });

    if (validItems.length === 0) return;

    const newExpenditures = validItems.map((item) => ({
      id: Date.now() + Math.random(),
      date: today,
      purpose: item.item,
      amount: parseInt(evaluateExpression(item.cost)),
      link: "",
    }));

    setExpenditures([...expenditures, ...newExpenditures]);
    setSimItems([{ id: Date.now(), item: "", cost: "" }]);
  };

  return (
    <MainLayOut>
      <PageContainer>
        <Header>
          <Title>예산 관리</Title>
          <Subtitle>학회 예산을 투명하고 효율적으로 관리하세요.</Subtitle>
        </Header>

        <MainContent>
          {/* Current Budget Section */}
          <section>
            <BudgetDisplay>
              <p className="text-sm text-amber-800 mb-2">현재 잔여 예산</p>
              <Amount>{currentBudget.toLocaleString()} 원</Amount>
            </BudgetDisplay>
          </section>

          {/* Expenditure List Section */}
          <section>
            <SectionTitle>
              <span className="text-amber-600">📋</span> 지출 내역
            </SectionTitle>

            <Card className="mb-4 border-amber-300 shadow-lg bg-white">
              <CardHeader className="bg-white">
                <CardTitle className="text-xl font-bold text-amber-900">
                  새 지출 내역 추가
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">날짜</Label>
                    <div className="relative">
                      <Input
                        id="date"
                        type="date"
                        className="border-2 border-amber-300 focus:border-amber-500 pr-16"
                        value={newExp.date}
                        onChange={(e) =>
                          setNewExp({ ...newExp, date: e.target.value })
                        }
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setNewExp({
                            ...newExp,
                            date: new Date().toISOString().split("T")[0],
                          })
                        }
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-xs bg-amber-600 hover:bg-amber-700 px-2 py-1 rounded text-white"
                      >
                        오늘
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount">금액 (원)</Label>
                    <Input
                      id="amount"
                      type="text"
                      placeholder="0 또는 1000*8"
                      className="border-2 border-amber-300 focus:border-amber-500"
                      value={newExp.amount}
                      onChange={(e) =>
                        setNewExp({ ...newExp, amount: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="purpose">사용 목적</Label>
                  <Input
                    id="purpose"
                    placeholder="무엇에 사용했나요?"
                    className="border-2 border-amber-300 focus:border-amber-500"
                    value={newExp.purpose}
                    onChange={(e) =>
                      setNewExp({ ...newExp, purpose: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="link">영수증 (선택사항)</Label>
                  <Input
                    id="link"
                    placeholder="링크, 파일 경로, 또는 저장 위치를 입력하세요"
                    className="border-2 border-amber-300 focus:border-amber-500"
                    value={newExp.link}
                    onChange={(e) =>
                      setNewExp({ ...newExp, link: e.target.value })
                    }
                  />
                  <p className="text-xs text-gray-500">
                    예: https://drive.google.com/..., C:\Documents\receipt.jpg,
                    구글 드라이브 &gt; 2025학회 &gt; 영수증 폴더
                  </p>
                </div>
                <Button
                  onClick={handleAddExpenditure}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" /> 내역 추가
                </Button>
              </CardContent>
            </Card>

            <ExpenditureList>
              {expenditures.map((item) => (
                <ExpenditureItem key={item.id}>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-gray-500">{item.date}</span>
                    <span className="font-medium text-gray-800">
                      {item.purpose}
                    </span>
                    {item.link && (
                      <a
                        href={item.link.startsWith("http") ? item.link : "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-500 flex items-center gap-1 hover:underline"
                        title={item.link}
                      >
                        <ExternalLink className="w-3 h-3" /> 영수증 확인
                      </a>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-amber-700">
                      -{item.amount.toLocaleString()} 원
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteExpenditure(item.id)}
                      className="text-red-400 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </ExpenditureItem>
              ))}
            </ExpenditureList>
          </section>

          {/* Simulation Section */}
          <section>
            <SectionTitle>
              <Calculator className="w-6 h-6 text-amber-600" /> 예산 시뮬레이션
            </SectionTitle>
            <SimulationSection>
              <p className="text-sm text-gray-600 mb-4">
                예정된 지출이 예산에 미치는 영향을 미리 확인해보세요.
              </p>
              <div className="space-y-3">
                {simItems.map((simItem, index) => (
                  <div
                    key={simItem.id}
                    className="flex flex-col md:flex-row gap-4 items-end"
                  >
                    <div className="space-y-2 flex-1 w-full">
                      <Label>항목명</Label>
                      <Input
                        placeholder="예: MT 비용"
                        className="border-2 border-amber-300 focus:border-amber-500"
                        value={simItem.item}
                        onChange={(e) =>
                          handleSimItemChange(
                            simItem.id,
                            "item",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="space-y-2 flex-1 w-full">
                      <Label>예상 금액</Label>
                      <Input
                        type="text"
                        placeholder="0 또는 1000*8"
                        className="border-2 border-amber-300 focus:border-amber-500"
                        value={simItem.cost}
                        onChange={(e) =>
                          handleSimItemChange(
                            simItem.id,
                            "cost",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    {simItems.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveSimItem(simItem.id)}
                        className="text-red-400 hover:text-red-600 hover:bg-red-50 mb-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  onClick={handleAddSimItem}
                  variant="outline"
                  className="w-full border-2 border-amber-300 text-amber-700 hover:bg-amber-50"
                >
                  <Plus className="w-4 h-4 mr-2" /> 항목 추가
                </Button>
              </div>

              {totalSimCost > 0 && (
                <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">현재 예산:</span>
                    <span className="font-medium">
                      {currentBudget.toLocaleString()} 원
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2 text-red-500">
                    <span>예상 지출:</span>
                    <span>- {totalSimCost.toLocaleString()} 원</span>
                  </div>
                  <div className="h-px bg-amber-200 my-2"></div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-amber-800">
                      지출 후 잔액:
                    </span>
                    <span
                      className={`font-bold text-xl ${
                        simulatedRemaining < 0
                          ? "text-red-600"
                          : "text-amber-600"
                      }`}
                    >
                      {simulatedRemaining.toLocaleString()} 원
                    </span>
                  </div>
                  <Button
                    onClick={handleAddSimToExpenditure}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" /> 지출 내역에 추가
                  </Button>
                </div>
              )}
            </SimulationSection>
          </section>
        </MainContent>
      </PageContainer>
    </MainLayOut>
  );
};

export default BudgetPage;
