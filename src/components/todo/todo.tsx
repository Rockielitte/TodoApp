import { Check, ClipboardList, Minus, PackagePlus, Zap } from "lucide-react";
import { ResizablePanel, ResizablePanelGroup } from "../ui/resizable";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { TodoList } from "./todo-list";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../ui/button";
import { useState } from "react";
import { z } from "zod";
import { useAppDispatch } from "@/hooks";
import { TODOSTATENUM, TodoItem } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { addTodo, clearAllCompleted } from "@/redux/slices/todo";
const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
});
import logo from "@/assets/logo.png";
type FormSchemaType = z.infer<typeof formSchema>;
export function Todo() {
  const [catorgery, setCatorgery] = useState("all");
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,

    formState: { errors, isDirty },
    reset,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });
  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    const item: TodoItem = {
      title: data.title,
      state: TODOSTATENUM.INCOMPLETE,
      id: uuidv4(),
      createdAt: new Date().toString(),
    };
    dispatch(addTodo(item));
    reset({ title: "" });
  };

  return (
    <div className="h-full overflow-auto">
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full items-stretch flex overflow-auto"
      >
        <ResizablePanel
          defaultSize={440}
          minSize={45}
          className="overflow-auto "
        >
          <Tabs
            defaultValue="all"
            className="h-full flex flex-col overflow-auto w-full"
          >
            <div className="flex w-full items-center  gap-4 max-sm:flex-col ">
              <h1 className="text-2xl font-bold text-white uppercase  rounded-full flex items-center gap-1 ">
                <img
                  src={logo}
                  className="h-8 object-cover rounded-full
                "
                ></img>
                <span>Todo</span>
              </h1>
              <form
                className="flex-1 relative w-full m-3"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
              >
                <PackagePlus className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <div className="w-full flex flex-col gap-1 max-sm:px-1">
                  <Input
                    placeholder="Start typing . . ."
                    className="px-9 outline-gradient pr-28 "
                    {...register("title")}
                  />
                  {errors.title ? (
                    <span className="col-span-4 text-xs  text-red-600 font-medium backdrop:blur-2xl ">
                      {errors.title.message}
                    </span>
                  ) : (
                    <span className="col-span-4 text-xs font-normal text-slate-900 ">
                      Atleast 3 characters required.
                    </span>
                  )}
                </div>
                <Button
                  disabled={!isDirty}
                  type="submit"
                  size={"sm"}
                  style={{
                    background: "var(--gradient)",
                  }}
                  className=" px-8 scale-[85%]  font-medium py-0 absolute right-2 top-[2px] "
                >
                  Create
                </Button>
              </form>
            </div>
            <Separator
              className="h-2 rounded-e-2xl"
              style={{
                background: "var(--gradient)",
              }}
            />
            <div className="bg-background rounded-lg flex-1 flex flex-col overflow-auto">
              <div className="bg-background/95 p-4 flex md:flex-row flex-col gap-2 justify-between backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <TabsList className="">
                  <TabsTrigger
                    value="all"
                    onClick={() => setCatorgery("all")}
                    className="text-zinc-600 dark:text-zinc-200 data-[state=active]:bg-gradient-to-r from-violet-200 to-pink-200"
                  >
                    <ClipboardList className="w-4 h-4 mr-2 hidden md:inline-block" />
                    All
                  </TabsTrigger>
                  <TabsTrigger
                    value="incomplete"
                    onClick={() => setCatorgery("incomplete")}
                    className="text-zinc-600 dark:text-zinc-200  "
                  >
                    <Minus className="w-4 h-4 mr-2 hidden md:inline-block" />
                    Incomplete
                  </TabsTrigger>
                  <TabsTrigger
                    value="inprogress"
                    onClick={() => setCatorgery("inprogress")}
                    className={cn(
                      "text-zinc-600 dark:text-zinc-200 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                    )}
                  >
                    <Zap className="w-4 h-4 mr-2 hidden md:inline-block" />
                    In progress
                  </TabsTrigger>
                  <TabsTrigger
                    value="completed"
                    onClick={() => setCatorgery("completed")}
                    className="text-zinc-600 dark:text-zinc-200 data-[state=active]:bg-red-500 data-[state=active]:text-white"
                  >
                    <Check className="w-4 h-4 mr-2 hidden md:inline-block" />
                    Completed
                  </TabsTrigger>
                </TabsList>
                <Button
                  onClick={() => {
                    dispatch(clearAllCompleted());
                  }}
                  size={"sm"}
                  style={
                    {
                      // background: "var(--gradient)",
                    }
                  }
                  variant={"destructive"}
                  className="  mr-auto  md:ml-auto md:mr-0 font-medium "
                >
                  Clear all completed
                </Button>
              </div>
              <div className="h-full overflow-auto mr-1">
                <div className="m-0 overflow-auto">
                  <TodoList catorgery={catorgery} />
                </div>
              </div>
            </div>
          </Tabs>
        </ResizablePanel>
        {/* <ResizableHandle withHandle className="w-2 " />
        <ResizablePanel className="flex-1" minSize={30}>
          <ItemDisplay />
        </ResizablePanel> */}
      </ResizablePanelGroup>
    </div>
  );
}
