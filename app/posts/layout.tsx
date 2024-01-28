"use client";
import { Spinner } from "@/components/spinner";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import funFactsData from '@/uci_fun_facts.json';
import { useState, useEffect } from "react";
import { UploadResumeModal } from "@/components/modals/upload_modal";

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
  const [funFact, setFunFact] = useState<string | null>(null);

    useEffect(() => {
        // This code will only run on the client side after the component mounts
        const fact = getRandomFunFact();
        setFunFact(fact.fact);
    }, []);

  if (isLoading) {
    return (
        <div className="h-full flex flex-col gap-x-2 items-center justify-center dark:bg-[#1F1F1F]">
            <div className="pb-20 max-w-96">
                <h2 className="text-[#2563eb] dark:text-[#0390fc] font-extrabold">Did You Know?</h2>
                <p>{funFact ? funFact : "Loading Fun Fact..."}</p>
            </div>
            <Spinner size="lg" />
        </div>
    )
}

  if (!isAuthenticated) {
    return redirect("/");
  }

  return (
    <div className="h-full flex dark:bg-[#121212]">
        <main className="flex-1 h-full overflow-y-auto dark:bg-[#121212]">
          {children}
        </main>
        <UploadResumeModal />
    </div>
  );
};

export default PostsLayout;
