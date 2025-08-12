'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CourseCategory } from '@/generated/openapi-client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LucideIcon,
  Gamepad2,
  Cpu,
  GraduationCap,
  Brain,
  Palette,
  Shield,
  GanttChartSquare,
  Briefcase,
  Database,
  Code,
  TrendingUp,
  Layers,
  Globe,
  LayoutDashboard,
  Play,
  ShoppingCart,
} from "lucide-react";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
type Category = {
  value: string;
  label: string;
  Icon: LucideIcon;
  href: string;
};
const CATEGORIES: Category[] = [
  { value: "all", label: "전체", Icon: Layers, href: "/c/all" },
  { value: "dev", label: "개발·프로그래밍", Icon: Code, href: "/c/dev" },
  { value: "game", label: "게임 개발", Icon: Gamepad2, href: "/c/game" },
  { value: "data", label: "데이터", Icon: Database, href: "/c/data" },
  { value: "ai", label: "인공지능", Icon: Brain, href: "/c/ai" },
  { value: "security", label: "보안·네트워크", Icon: Shield, href: "/c/security" },
  { value: "hardware", label: "하드웨어", Icon: Cpu, href: "/c/hardware" },
  { value: "design", label: "디자인·아트", Icon: Palette, href: "/c/design" },
  { value: "biz", label: "기획·경영·마케팅", Icon: Briefcase, href: "/c/biz" },
  { value: "productivity", label: "업무 생산성", Icon: GanttChartSquare, href: "/c/productivity" },
  { value: "career", label: "커리어·자기계발", Icon: TrendingUp, href: "/c/career" },
  { value: "edu", label: "대학 교육", Icon: GraduationCap, href: "/c/edu" },
];

const navLinks = [
  { label: "강의", href: "/courses" },
  { label: "로드맵", href: "/roadmaps" },
  { label: "멘토링", href: "/mentoring" },
  { label: "커뮤니티", href: "/community" },
];
export default function SiteHeader({ categories }: { categories: CourseCategory[] }) {
  console.log(categories);
const pathname = usePathname();
  return (
    <header>
      <div className='flex items-center justify-between gap-4'>
        <Link href="/" aria-label="홈으로 이동" className="block p-4">
          <Image  src="https://cdn.inflearn.com/assets/brand/logo.png?f=avif&w=220" alt="Logo" width={220} height={60} priority/>
        </Link>
        <nav aria-label="메인 네비게이션">
          <ul className='flex items-center gap-4 shrink-0'>
            {navLinks.map((link) => {
              const isCurrent = pathname === link.href;
              return (
                <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isCurrent ? "page" : undefined}
                  className={`text-muted-foreground hover:text-foreground ${isCurrent ? "font-medium underline underline-offset-4" : ""}`}
                >
                  {link.label}
                </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <form
          role="search"
          className="flex flex-1 min-w-0 max-w-2xl items-center gap-3"
          onSubmit={(e) => e.preventDefault()}
        >
          <label htmlFor="q" className="sr-only">검색</label>
          <Input
            id="q"
            name='q'
            placeholder="나의 진짜 성장을 도와줄 실무 강의를 찾아보세요"
            aria-label="검색어 입력"
          />
          <Button type="submit">검색</Button>
        </form>
         <div className='flex mr-4'>
           <Link href="/instructor">
            <Button
              variant="outline"
              className="font-semibold border-gray-200 cursor-pointer hover:border-[#1dc078] hover:text-[#1dc078]"
            >
              지식공유자
            </Button>
          </Link>
          {/* Avatar */}
          <Avatar className="ml-2">
            <AvatarFallback className="bg-gray-200 text-gray-500">
              <span role="img" aria-label="user">
                👤
              </span>
            </AvatarFallback>
          </Avatar>
         </div>
      </div>
      

    </header>
  );
}

      // <nav>
      //   <ul>
      //     {categories.map((category) => (
      //       <li key={category.id}>{category.name}</li>
      //     ))}
      //   </ul>
      // </nav>