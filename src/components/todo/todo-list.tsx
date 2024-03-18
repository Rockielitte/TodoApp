import { cn } from "@/lib/utils";

import { ComponentProps, FC, useMemo, useState } from "react";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { Badge } from "../ui/badge";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { TODOSTATENUM } from "@/types";
import { Check, Minus, Trash, Zap } from "lucide-react";
import { Button } from "../ui/button";
import { removeTodo, toggleTodo } from "@/redux/slices/todo";
import { Tooltip } from "@radix-ui/react-tooltip";
import { TooltipContent, TooltipTrigger } from "../ui/tooltip";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import TodoFormModal from "./todoFormModal";

type Props = {
  catorgery: string;
};
export const TodoList: FC<Props> = ({ catorgery }) => {
  const items = useAppSelector((state) => state.todo.todos);
  const [itemSelected, setItemSelected] = useState<string>("");
  const dispatch = useAppDispatch();
  const data = useMemo(() => {
    if (catorgery === "all") {
      return items;
    }
    return items.filter((item) => item.state === catorgery);
  }, [catorgery, items]);
  return (
    <div className="h-full overflow-auto">
      <div className="h-full py-1">
        <div className="flex flex-col gap-2 p-4 pt-0 transition-all duration-1000">
          {data.length > 0 ? (
            data.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "flex flex-col items-start gap-1 rounded-lg border-b py-1 pb-2 text-left text-sm  "
                )}
                onClick={() => {
                  setItemSelected(item.id);
                }}
              >
                <div
                  className={cn(
                    "flex w-full p-2 rounded-lg bg-background  hover:bg-accent transition-all ease-in-out duration-700   whitespace-nowrap text-ellipsis overflow-hidden",
                    itemSelected === item.id &&
                      "bg-gradient-to-tl from-purple-100 to-purple-50"
                  )}
                >
                  <div className="flex items-center justify-between w-full  gap-2  whitespace-nowrap text-ellipsis overflow-hidden">
                    <div className="flex  items-start md:items-center md:gap-2 gap-1 md:flex-1 flex-col md:flex-row whitespace-nowrap text-ellipsis overflow-hidden  ">
                      <div className="flex items-center gap-1  ">
                        {item.state === TODOSTATENUM.INCOMPLETE ? (
                          <Minus className="w-4 h-4" />
                        ) : item.state === TODOSTATENUM.COMPLETED ? (
                          <Check color="red" className="w-4 h-4" />
                        ) : (
                          <Zap color="blue " className="w-4 h-4" />
                        )}
                        <Badge
                          variant={getBadgeVariantFromLabel(item.state)}
                          className="capitalize"
                        >
                          {item.state}
                        </Badge>
                      </div>
                      <span
                        className={cn(
                          "font-normal transition-all duration-200 ease-in text-wrap  flex-1  ",
                          item.state == TODOSTATENUM.COMPLETED &&
                            "line-through decoration-double text-red-800 font-medium",
                          item.state == TODOSTATENUM.INPROGRESS &&
                            "text-blue-800 font-medium"
                        )}
                      >
                        {item.title}
                      </span>
                    </div>
                    <div
                      className={cn(
                        " text-xs flex items-center md:gap-3 gap-1  justify-end ",
                        itemSelected === item.id
                          ? "text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      <div className=" font-bold  transition-all duration-200 border-x px-1 border-purple-500 ">
                        {itemSelected === item.id &&
                          (item.state === TODOSTATENUM.INCOMPLETE ? (
                            <div
                              className="md:flex md:flex-row md:gap-0.5 items-center text-blue-500  cursor-pointer opacity-70 hover:scale-105 hover:opacity-100 transition-all duration-200"
                              onClick={() => {
                                dispatch(
                                  toggleTodo({
                                    id: item.id,
                                    state: TODOSTATENUM.INPROGRESS,
                                  })
                                );
                              }}
                            >
                              Move to
                              <span className="font-extrabold flex gap-1 items-center">
                                In Progress
                              </span>
                              <Zap color="blue " />
                            </div>
                          ) : item.state === TODOSTATENUM.COMPLETED ? (
                            <div
                              className="md:flex md:flex-row md:gap-0.5 items-center  cursor-pointer opacity-70 hover:scale-105 hover:opacity-100 transition-all duration-200"
                              onClick={() => {
                                dispatch(
                                  toggleTodo({
                                    id: item.id,
                                    state: TODOSTATENUM.INCOMPLETE,
                                  })
                                );
                              }}
                            >
                              Back to
                              <span className="font-extrabold flex gap-1 items-center">
                                Incomplete
                              </span>
                              <Minus />
                            </div>
                          ) : (
                            <div className="font-bold flex gap-2 max-sm:gap-0.5 items-center ">
                              <div
                                className="md:flex md:flex-row md:gap-0.5 items-center  cursor-pointer opacity-70 hover:scale-105 hover:opacity-100 transition-all duration-200"
                                onClick={() => {
                                  dispatch(
                                    toggleTodo({
                                      id: item.id,
                                      state: TODOSTATENUM.INCOMPLETE,
                                    })
                                  );
                                }}
                              >
                                Back to
                                <span className="font-extrabold flex gap-1 items-center">
                                  Incomplete
                                </span>
                                <Minus />
                              </div>
                              <span className="self-stretch w-0.5 bg-gradient-to-tl from-purple-50 to-indigo-400"></span>
                              <div
                                className="md:flex md:flex-row md:gap-0.5 items-center text-red-500 font-bold  cursor-pointer opacity-70 hover:scale-105 hover:opacity-100 transition-all duration-200"
                                onClick={() => {
                                  dispatch(
                                    toggleTodo({
                                      id: item.id,
                                      state: TODOSTATENUM.COMPLETED,
                                    })
                                  );
                                }}
                              >
                                Move to
                                <span className="font-extrabold flex gap-1 items-center">
                                  Completed
                                </span>
                                <Check color="red" />
                              </div>
                            </div>
                          ))}
                      </div>
                      <div className="flex gap-2 flex-col md:flex-row items-end md:items-center ">
                        <span className="p-1 text-balance">
                          {formatDistanceToNow(
                            new Date(item.updatedAt || item.createdAt),
                            {
                              addSuffix: true,
                            }
                          )}
                        </span>
                        {itemSelected === item.id && (
                          <>
                            <AlertDialog>
                              <AlertDialogTrigger>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Trash className="rounded-full hover:bg-purple-300 cursor-pointer p-1 opacity-50 hover:scale-105 hover:opacity-100" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Delete this task.</p>
                                  </TooltipContent>
                                </Tooltip>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Are you absolutely sure?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will
                                    permanently delete your task and remove your
                                    data from our servers.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => {
                                      dispatch(removeTodo(item.id));
                                    }}
                                    className="p-0"
                                  >
                                    <Button
                                      variant={"destructive"}
                                      className="w-full"
                                    >
                                      Continue
                                    </Button>
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                            <TodoFormModal item={item} />
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-muted-foreground">
              No todo task found, add new task at input above.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export function getBadgeVariantFromLabel(
  label: string
): ComponentProps<typeof Badge>["variant"] {
  if (label === TODOSTATENUM.INPROGRESS) {
    return "default";
  }

  if (label === TODOSTATENUM.COMPLETED) {
    return "destructive";
  }

  return "secondary";
}
