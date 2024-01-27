"use client";
import { Spinner } from "@/components/spinner";
import { useConvexAuth } from "convex/react";
import { Sidebar } from "lucide-react";
import { redirect } from "next/navigation";
import funFactsData from '@/uci_fun_facts.json';

type FunFact = {
    fact: string;
};

const getRandomFunFact = (): FunFact => {
    const funFacts = funFactsData.funFacts;
    const randomIndex = Math.floor(Math.random() * funFacts.length);
    return funFacts[randomIndex];
};

const PostsLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    const funFact = getRandomFunFact();
    return (
        <div className="h-full flex items-center justify-center dark:bg-[#1F1F1F]">
            <div>
                <h2 className="text-[#2563eb] dark:text-[#0390fc]">Did You Know?</h2>
                <p>{funFact.fact}</p>
            </div>
            <Spinner size="lg"/>
        </div>
    )
}

  if (!isAuthenticated) {
    return redirect("/");
  }

  return (
    <div className="h-full flex">
      <main className="flex-1 h-full overflow-y-auto dark:bg-[#1F1F1F]">
        {children}
      </main>
    </div>
  );
};

export default PostsLayout;
