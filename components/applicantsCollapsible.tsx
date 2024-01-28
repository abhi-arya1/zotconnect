"use client"

import * as React from "react"
import { ChevronsUpDown } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

interface ApplicantProps {
    postApplications: (string | undefined)[][]
}


export function ApplicantsCollapsible({ postApplications }: ApplicantProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const router = useRouter();

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full space-y-2"
    >
      <div className="flex items-center space-x-1 px-2">
        <h4 className="text-sm font-semibold">Applicants</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0 hover:bg-gray-300 dark:hover:bg-neutral-800">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="space-y-2 w-1/3">
        {postApplications.map((userTuple) => (
          <div key={userTuple[1]} role="button" onClick={() => window.open(`/profiles/${userTuple[1]}`, "_self")} className="rounded-md font-mono text-sm px-2 p-2 hover:bg-gray-300 dark:hover:bg-neutral-800">
            {'>>'} {userTuple[0]}, <i><a href={`mailto:${userTuple[2]}`}>{userTuple[2]}</a></i>
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}

