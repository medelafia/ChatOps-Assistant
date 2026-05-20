"use client";
import { AppSidebar } from "@/components/app-sidebar"
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Clipboard, Plus, Search, SendHorizontal, UserStar } from "lucide-react"
import React, { useEffect, useState } from "react";
import { LoaderIcon } from "lucide-react"
import { cn } from "@/lib/utils"



function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}
type Step = {
  "step_name" : string ; 
  "risk" : string  ; 
  "step_description" : string ;
  "command" : string ; 
}

type Plan = { 
  "steps" : Step[]
  "result"? : any 
}

type Message = { plan? : Plan , from : string  , message? : string , type : string }


export default function Page() {
  const [messages , setMessages ] = React.useState<Message[]>([])
  const [ messageToSend , setMessageToSend ] = useState("")
  const [ isGeneratingPlan , setIsGeneratingPlan] = useState(false )
  const [ isExecutingInSandbox , setIsExecutingInSandbox ] = useState(false)
  function addMessageToList(message : Message) { 
    setMessages(prev => [...prev, message])
  }

  function sendMessage() { 
    const message = messageToSend.trim()
    if( message != "" ) { 
      setIsGeneratingPlan(true)
      addMessageToList({from : "you" , message : message , type : "SIMPLE"})
      setMessageToSend("")
      fetch(`http://localhost:8000/chat?message=${encodeURIComponent(message)}`)
      .then(res => {
        if (!res.ok) throw new Error("Network error")
        return res.json()
      })
      .then(data => {
        console.log(data)
        addMessageToList({ from: "backend", plan: data.content, type : data.type})
        setIsGeneratingPlan(false)
        setIsExecutingInSandbox(true)
        fetch('http://localhost:8000/executePlan' , {
          method : "POST"  ,
          headers : {
            "Content-Type": "application/json"
          } ,
          body : JSON.stringify(data.content)
        })
        .then(res => {
          return res.json()
        })
        .then(data => {
          setMessages(prevState => { 
            const arr = [...prevState] 
            arr[arr.length - 1].plan = { ...arr[arr.length - 1].plan! , result : data.content.steps_result }
            return arr
          })
          setIsExecutingInSandbox(false)
        })
      })
    }
  }
  useEffect(() => {
    console.log(messages)
  } , [messages])
  function getBadgeClass(risk : string) { 
    if(risk.toLowerCase() == "low")
      return "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
    if(risk.toLowerCase() == "medium")
      return "bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300"
    if(risk.toLowerCase() == "high")
      
      return "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300"
    if(risk.toLowerCase() == "critical")
      return "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"
  }

  return (
    <SidebarProvider>
      <TooltipProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-vertical:h-4 data-vertical:self-auto"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    ChatOps
                  </BreadcrumbLink>
                </BreadcrumbItem>
                { /*<BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>*/}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 flex flex-col items-center">

          <div className="overflow-scroll w-5/6 lg:w-4xl h-[28rem]">
          {
            messages?.length == 0 
              ? <div className="w-full py-32 flex flex-col items-center justify-center text-3xl">
                <UserStar size={"5rem"} className="mb-5"/>
                ChatOps is live! What’s on your mind today?
              </div>
              : messages?.map((item , key) => <div key={key} className="my-6"> 
              { 
                item.from == "backend" 
                ? 
                  <>
                  { item.type == "PLAN" && 
                    <>
                      <h1 className="text-2xl font-bold">📝 Plan</h1>
                      {
                        item.plan?.steps.map((step , key)=> <div key={key}> 
                          <Separator className="my-4"/>
                          <div className="flex justify-between">
                            <h1 className="capitalize font-bold text-lg">{key + 1} - {step.step_name}</h1>
                            <div>
                              <span className="font-bold capitalize">command risk : </span>
                              <Badge className={getBadgeClass(step.risk)}>
                                {step.risk}
                              </Badge>
                            </div>
                          </div>
                          <p className="mt-4">{step.step_description}</p>
                          <div className="rounded-2xl border px-4 py-2 flex items-center justify-between mt-2">
                            <span>{step.command}</span>
                            <div className="flex">
                              <Button variant={"outline"} size={"sm"} className="me-1"><Clipboard /></Button>
                              <Button variant={"outline"} size={"sm"} className="ms-1"><Search /></Button>
                            </div>
                          </div>

                          {
                            item.plan?.result != undefined 
                            && <div className="my-3">
                                Output :
                                  <div className="rounded-2xl border px-4 py-2 flex items-center justify-between mt-2">
                                    { item.plan?.result[key].error != "" && <p><span className="text-red-500 font-bold">Error :</span> {item.plan?.result[key].error}</p>}
                                    { item.plan?.result[key].output != "" && <p>{item.plan?.result[key].output}</p>}
                                  </div>
                                </div>
                          }
                        </div>)
                      }
                      { isExecutingInSandbox && <div className="flex items-center mt-4 font-bold text-2xl"><Spinner /><span className="ms-3">Executing in sandbox</span></div>} 
                    </>
                  } 
                  </>
              :
                <div className="flex justify-end">
                  <div className="rounded-2xl border px-4 py-2 flex items-center justify-between mt-2 bg-secondary w-3xl">
                    {item.message}
                  </div>
                </div>
            }
            { isGeneratingPlan && <div className="flex items-center font-bold text-2xl mt-4"><Spinner /><span className="ms-3">generating plan</span></div>} 
            </div>)
          }
          </div>
          <div className="p-4 absolute bottom-10 border rounded-4xl w-5/6 lg:w-4xl flex justify-between my-8">
            <Button className="rounded-xl" variant="outline"><Plus/></Button>
            <Input 
              className="border-0 shadow-0 mx-3" 
              onChange={(value) => setMessageToSend(value.currentTarget.value)}
              value={messageToSend!}
            >
            </Input>
            <Button 
              className="!rounded-xl" 
              variant="outline" 
              disabled={messageToSend.trim() == ""} 
              onClick={sendMessage}>
                <SendHorizontal/>Send
            </Button>
          </div>
        </div>
      </SidebarInset>
      </TooltipProvider>
    </SidebarProvider>
  )
}
