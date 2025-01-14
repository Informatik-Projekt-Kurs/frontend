"use client";
import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import { ArrowUpDown, CalendarIcon, Check, ChevronDown, ChevronsUpDown, Clock, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Appointment } from "@/types";
import { calculateAppointmentDuration, cn, formatDateString } from "@/lib/utils";
import { FaPlus } from "react-icons/fa6";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, set } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useMutation } from "@apollo/client";
import { CREATE_APPOINTMENT } from "@/lib/graphql/mutations";
import { useCompany } from "@/components/dashboard/CompanyContext";
import { useToast } from "@/components/ui/use-toast";

const bookingFormSchema = z
  .object({
    title: z.string().max(30).optional(),
    description: z.string().optional(),
    from: z.date(),
    to: z.date(),
    location: z.string().optional(),
    client: z.number().optional() // client id
  })
  .refine(
    (data) => {
      // Check if dates are not the same
      const sameDateTime = data.from.getTime() === data.to.getTime();
      // Check if 'to' is not earlier than 'from'
      const toBeforeFrom = data.to.getTime() < data.from.getTime();

      return !sameDateTime && !toBeforeFrom;
    },
    {
      message: "Invalid date range: End time must be after start time",
      path: ["to"] // This will show the error under the 'to' field
    }
  );

const columns: Array<ColumnDef<Appointment>> = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => {
          table.toggleAllPageRowsSelected(value as boolean);
        }}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          row.toggleSelected(value as boolean);
        }}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}>
          ID
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: "title",
    header: "Title",
    enableSorting: false
  },
  {
    accessorKey: "description",
    header: "Description",
    enableSorting: false
  },
  {
    accessorKey: "from",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}>
          From
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="font-medium">{formatDateString(row.getValue("from"))}</div>;
    }
  },
  {
    accessorKey: "to",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}>
          To
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="font-medium">{formatDateString(row.getValue("to"))}</div>;
    }
  },
  {
    accessorKey: "duration",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}>
          Duration
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="font-medium">{calculateAppointmentDuration(row.getValue("from"), row.getValue("to"))}</div>
      );
    }
  },
  {
    accessorKey: "Status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}>
          Status
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    }
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const appointment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                void navigator.clipboard.writeText(appointment.id.toString());
              }}>
              Copy appointment ID
            </DropdownMenuItem>
            {appointment.Status === "BOOKED" && appointment.clientId !== "" && (
              <DropdownMenuItem
                onClick={() => {
                  if (appointment.clientId !== "") void navigator.clipboard.writeText(appointment.clientId.toString());
                }}>
                Copy booked user ID
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];

export function BookingsTable(): React.ReactElement {
  const { appointments, clients, refreshAppointments } = useCompany();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
    id: false,
    description: false,
    to: false
  });
  const [rowSelection, setRowSelection] = React.useState({});

  const [createAppointment] = useMutation(CREATE_APPOINTMENT);

  const table = useReactTable({
    data: appointments,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  });

  const form = useForm<z.infer<typeof bookingFormSchema>>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      title: "",
      description: "",
      from: set(new Date(), { hours: 14, minutes: 0, seconds: 0, milliseconds: 0 }),
      to: set(new Date(), { hours: 14, minutes: 30, seconds: 0, milliseconds: 0 }),
      location: ""
    }
  });

  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof bookingFormSchema>) {
    const appointmentInput = {
      variables: {
        title: values.title,
        description: values.description,
        from: values.from.toISOString(),
        to: values.to.toISOString(),
        location: values.location,
        clientId: values.client
      }
    };

    const response = await createAppointment(appointmentInput);

    if (response.data !== undefined) {
      toast({
        title: "Booking created",
        description: values.from.toDateString(),
        variant: "default",
        className: "border-emerald-300"
      });
      form.reset();
      await refreshAppointments();
    } else {
      console.error(response.errors);
    }
  }

  return (
    <div className="w-full text-foreground">
      <div className="flex items-center gap-x-2 py-4">
        <Input
          placeholder="Filter by title..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
            table.getColumn("title")?.setFilterValue(event.target.value);
          }}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => {
                      column.toggleVisibility(Boolean(value));
                    }}>
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        <Dialog>
          <DialogTrigger asChild>
            <Button className={"text-foreground"}>
              <FaPlus className={"mr-1"} />
              Create Booking
            </Button>
          </DialogTrigger>
          <DialogContent className="min-w-[450px] text-foreground">
            <DialogHeader>
              <DialogTitle>Create Booking</DialogTitle>
              <DialogDescription>Create a new Appointment-Slot for clients to book</DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Scrum Meeting" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter appointment details..." className="resize-none" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="from"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>From*</FormLabel>
                        <Popover modal={true}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  field.value === undefined && "text-muted-foreground"
                                )}>
                                {field.value !== undefined ? (
                                  format(field.value, "PPP HH:mm")
                                ) : (
                                  <span>Pick a date and time</span>
                                )}
                                <CalendarIcon className="ml-auto size-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-4" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(date) => {
                                if (date !== undefined) {
                                  const hours = field.value !== undefined ? field.value.getHours() : 0;
                                  const minutes = field.value !== undefined ? field.value.getMinutes() : 0;
                                  const newDate = set(date, { hours, minutes });
                                  field.onChange(newDate);
                                }
                              }}
                              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                              initialFocus
                            />
                            <div className="mt-4 flex items-center gap-2">
                              <Clock className="size-4" />
                              <div className="grid grid-cols-2 gap-2">
                                <Select
                                  value={field.value !== undefined ? format(field.value, "HH") : undefined}
                                  onValueChange={(hour) => {
                                    const newDate = field.value;
                                    const hours = parseInt(hour);
                                    field.onChange(set(newDate, { hours }));
                                  }}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Hour" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {Array.from({ length: 24 }, (_, i) => (
                                      <SelectItem key={i} value={i.toString().padStart(2, "0")}>
                                        {i.toString().padStart(2, "0")}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <Select
                                  value={field.value !== undefined ? format(field.value, "mm") : undefined}
                                  onValueChange={(minute) => {
                                    const newDate = field.value;
                                    const minutes = parseInt(minute);
                                    field.onChange(set(newDate, { minutes }));
                                  }}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Min" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {["00", "15", "30", "45"].map((minute) => (
                                      <SelectItem key={minute} value={minute}>
                                        {minute}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* To field - identical structure as From field */}
                  <FormField
                    control={form.control}
                    name="to"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>To*</FormLabel>
                        <Popover modal={true}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  field.value === undefined && "text-muted-foreground"
                                )}>
                                {field.value !== undefined ? (
                                  format(field.value, "PPP HH:mm")
                                ) : (
                                  <span>Pick a date and time</span>
                                )}
                                <CalendarIcon className="ml-auto size-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-4" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(date) => {
                                if (date !== undefined) {
                                  const hours = field.value !== undefined ? field.value.getHours() : 0;
                                  const minutes = field.value !== undefined ? field.value.getMinutes() : 0;
                                  const newDate = set(date, { hours, minutes });
                                  field.onChange(newDate);
                                }
                              }}
                              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                              initialFocus
                            />
                            <div className="mt-4 flex items-center gap-2">
                              <Clock className="size-4" />
                              <div className="grid grid-cols-2 gap-2">
                                <Select
                                  value={field.value !== undefined ? format(field.value, "HH") : undefined}
                                  onValueChange={(hour) => {
                                    const newDate = field.value;
                                    const hours = parseInt(hour);
                                    field.onChange(set(newDate, { hours }));
                                  }}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Hour" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {Array.from({ length: 24 }, (_, i) => (
                                      <SelectItem key={i} value={i.toString().padStart(2, "0")}>
                                        {i.toString().padStart(2, "0")}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <Select
                                  value={field.value !== undefined ? format(field.value, "mm") : undefined}
                                  onValueChange={(minute) => {
                                    const newDate = field.value;
                                    const minutes = parseInt(minute);
                                    field.onChange(set(newDate, { minutes }));
                                  }}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Min" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {["00", "15", "30", "45"].map((minute) => (
                                      <SelectItem key={minute} value={minute}>
                                        {minute}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Meeting Room 1 / Zoom Link" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="client"
                  render={({ field }) => {
                    const [open, setOpen] = React.useState(false);
                    const [searchValue, setSearchValue] = React.useState("");

                    return (
                      <FormItem className="flex flex-col">
                        <FormLabel>Client</FormLabel>
                        <Popover modal={true} open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className={cn(
                                  "w-full justify-between",
                                  field.value === undefined && "text-muted-foreground"
                                )}
                                onClick={() => {
                                  setOpen(!open);
                                }}>
                                {field.value !== undefined
                                  ? clients.getClients.find((client) => client.id === field.value)?.name
                                  : "Select client..."}
                                <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent
                            align="start"
                            className="w-full p-0 max-sm:w-[200px]"
                            side="bottom"
                            sideOffset={4}>
                            <Command shouldFilter={false}>
                              <CommandInput
                                placeholder="Search clients..."
                                value={searchValue}
                                onValueChange={setSearchValue}
                                className="h-9"
                              />
                              <CommandList>
                                <CommandEmpty>No client found.</CommandEmpty>
                                <CommandGroup>
                                  <CommandItem
                                    value="clear"
                                    onSelect={() => {
                                      field.onChange(undefined);
                                      setSearchValue("");
                                      setOpen(false);
                                    }}>
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        field.value === undefined ? "opacity-100" : "opacity-0"
                                      )}
                                    />
                                    No client
                                  </CommandItem>
                                  {clients.getClients
                                    .filter((client) => client.name.toLowerCase().includes(searchValue.toLowerCase()))
                                    .map((client) => (
                                      <CommandItem
                                        key={client.id}
                                        value={client.id.toString()}
                                        onSelect={() => {
                                          field.onChange(client.id === field.value ? undefined : client.id);
                                          setSearchValue("");
                                          setOpen(false);
                                        }}>
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            field.value === client.id ? "opacity-100" : "opacity-0"
                                          )}
                                        />
                                        {client.name} {` ID:(${client.id})`}
                                      </CommandItem>
                                    ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                        <FormDescription>
                          If no client is selected, anyone subscribed to your company can book this appointment
                        </FormDescription>
                      </FormItem>
                    );
                  }}
                />
                <DialogFooter>
                  <Button type="submit">Create</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="rounded-md border border-border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length !== 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
          selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              table.previousPage();
            }}
            disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              table.nextPage();
            }}
            disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
