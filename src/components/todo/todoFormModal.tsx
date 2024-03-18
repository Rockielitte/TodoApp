import { TODOSTATENUM, TodoItem } from "@/types";
import { Check, FilePenLine, Minus, Zap } from "lucide-react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks";
import { editTodo } from "@/redux/slices/todo";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type Props = {
  item: TodoItem;
};
const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  state: z.nativeEnum(TODOSTATENUM),
});
type FormSchemaType = z.infer<typeof formSchema>;
const TodoFormModal = ({ item }: Props) => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors, isDirty },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: item.title,
      state: item.state,
    },
  });
  useEffect(() => {
    reset({
      title: item.title,
      state: item.state,
    });
  }, [item]);
  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    dispatch(editTodo({ id: item.id, ...data }));
    setOpen(false);
    // reset(data);
  };
  console.log("lll");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Tooltip>
          <TooltipTrigger>
            <FilePenLine className="rounded-full hover:bg-purple-300 cursor-pointer p-1 opacity-50 hover:opacity-100" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit this task.</p>
          </TooltipContent>
        </Tooltip>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-auto flex flex-col gap-1 ">
        <DialogHeader>
          <DialogTitle>Edit task</DialogTitle>
          <DialogDescription>
            Make changes to your task here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form
          className="flex flex-col gap-2 overflow-auto flex-1 w-full p-2 py-1"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid gap-4">
            <div className="grid grid-cols-5 items-center gap-3">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <div className="col-span-4 flex flex-col gap-1">
                <Textarea
                  id="title"
                  {...register("title")}
                  className="w-full"
                />
                {errors.title ? (
                  <span className="col-span-4 text-xs font-light text-red-500 ">
                    {errors.title.message}
                  </span>
                ) : (
                  <span className="col-span-4 text-xs font-light text-slate-400 ">
                    Atleast 3 characters required.
                  </span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-5 items-center gap-3">
              <Label htmlFor="state" className="text-right">
                Status
              </Label>
              <div className="flex flex-col col-span-4 gap-1">
                <Select
                  onValueChange={(value: TODOSTATENUM) => {
                    setValue("state", value, {
                      shouldDirty: true,
                    });
                  }}
                  defaultValue={getValues("state")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a state" />
                  </SelectTrigger>
                  <SelectContent>
                    {item.state === TODOSTATENUM.INCOMPLETE ? (
                      <>
                        <SelectItem value={item.state} className="">
                          <div className="flex w-full items-center flex-nowrap gap-2">
                            <Minus color="gray" />
                            <span className="uppercase mr-2 font-semibold ">
                              {item.state}
                            </span>
                          </div>
                        </SelectItem>
                        <SelectItem
                          value={TODOSTATENUM.INPROGRESS}
                          className=""
                        >
                          <div className="flex w-full items-center flex-nowrap gap-2">
                            <Zap color="blue " />
                            <span className="uppercase mr-2 text-blue-700 font-semibold">
                              {TODOSTATENUM.INPROGRESS}
                            </span>
                          </div>
                        </SelectItem>
                      </>
                    ) : item.state == TODOSTATENUM.COMPLETED ? (
                      <>
                        <SelectItem value={item.state} className="">
                          <div className="flex w-full items-center flex-nowrap gap-2">
                            <Check color="red" />
                            <span className="uppercase mr-2 font-semibold text-red-700 ">
                              {item.state}
                            </span>
                          </div>
                        </SelectItem>
                        <SelectItem
                          value={TODOSTATENUM.INCOMPLETE}
                          className=""
                        >
                          <div className="flex w-full items-center flex-nowrap gap-2">
                            <Minus color="gray" />
                            <span className="uppercase mr-2  font-semibold">
                              {TODOSTATENUM.INCOMPLETE}
                            </span>
                          </div>
                        </SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem
                          value={TODOSTATENUM.INCOMPLETE}
                          className=""
                        >
                          <div className="flex w-full items-center flex-nowrap gap-2">
                            <Minus color="gray" />
                            <span className="uppercase mr-2 font-semibold ">
                              {TODOSTATENUM.INCOMPLETE}
                            </span>
                          </div>
                        </SelectItem>
                        <SelectItem value={item.state} className="">
                          <div className="flex w-full items-center flex-nowrap gap-2">
                            <Zap color="blue " />
                            <span className="uppercase mr-2 text-blue-700 font-semibold">
                              {item.state}
                            </span>
                          </div>
                        </SelectItem>
                        <SelectItem value={TODOSTATENUM.COMPLETED} className="">
                          <div className="flex w-full items-center flex-nowrap gap-2">
                            <Check color="red" />
                            <span className="uppercase mr-2 font-semibold text-red-700 ">
                              {TODOSTATENUM.COMPLETED}
                            </span>
                          </div>
                        </SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
                {errors.state ? (
                  <span className="col-span-4 text-xs font-light text-red-500 ">
                    {errors.state.message}
                  </span>
                ) : (
                  <span className="col-span-4 text-xs font-light text-slate-400 ">
                    Status is required.
                  </span>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button className="mt-4" type="submit" disabled={!isDirty}>
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TodoFormModal;
