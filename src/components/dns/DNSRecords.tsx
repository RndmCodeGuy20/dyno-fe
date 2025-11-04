import React, { useState } from "react"
import {
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"
import CmdIcon from "../icons/CmdIcon"
import GoIcon from "../icons/GoIcon"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Copy, Pencil, Check, MoreHorizontal, X } from "lucide-react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useDnsRecordContext } from "@/hooks/useDns"

interface DnsRecord {
    id: string
    userId: string
    domainName: string
    currentIPV4: string
    currentIPV6: string
    createdAt: string
    updatedAt: string
}



const DNSRecords: React.FC = () => {
    const { records, isFetchLoading, isFetchError, updateRecord, deleteRecord } = useDnsRecordContext();

    const [editing, setEditing] = useState<{
        id: string
        field: "ipv4" | "ipv6"
    } | null>(null)

    const [tempValue, setTempValue] = useState("")

    const handleSave = async (record: DnsRecord, field: "ipv4" | "ipv6") => {
        toast.success(`${field.toUpperCase()} updated for ${record.domainName}`)
        await updateRecord(record.id, { [field === "ipv4" ? "ipv4" : "ipv6"]: tempValue })
        setEditing(null)
    }

    const [copyClicked, setCopyClicked] = useState<boolean>(false);
    const handleCopy = (domain: string) => {
        setCopyClicked(true);
        navigator.clipboard.writeText(domain);
        toast.success("Domain copied");
        setTimeout(() => setCopyClicked(false), 2000);
    }

    const columns: ColumnDef<DnsRecord>[] = [
        {
            accessorKey: "domainName",
            header: "Domain Name",
            cell: ({ row }) => (
                <div className="group flex items-center gap-2">
                    <span className="font-medium text-violet-500">{row.original.domainName}</span>
                    <button
                        onClick={() => handleCopy(row.original.domainName)}
                        className=" transition-opacity text-zinc-500 hover:text-violet-500 cursor-pointer"
                    >
                        {copyClicked ? (
                            <Check className="h-3 w-3 text-green-600 animate-in fade-in zoom-in duration-200" />
                        ) : (
                            <Copy className="h-3 w-3 animate-in fade-in zoom-in duration-200" />
                        )}
                    </button>
                </div>
            ),
        },
        {
            accessorKey: "currentIPV4",
            header: "IPv4",
            cell: ({ row }) => {
                const isEditing =
                    editing?.id === row.original.id && editing?.field === "ipv4"

                return (
                    <div className="flex items-center gap-2">
                        {isEditing ? (
                            <>
                                <Input
                                    autoFocus
                                    value={tempValue}
                                    onChange={(e) => setTempValue(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") handleSave(row.original, "ipv4")
                                    }}
                                    className="font-mono text-sm w-[130px] h-7 px-2 py-0 border border-zinc-200 rounded bg-zinc-50 text-zinc-700 focus-visible:ring-1 focus-visible:ring-violet-400 selection:text-white selection:bg-violet-500"
                                />
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-7 w-7 text-red-500 hover:text-red-700 shrink-0 cursor-pointer"
                                    onClick={() => setEditing(null)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-7 w-7 text-green-600 hover:text-green-700 shrink-0 cursor-pointer"
                                    onClick={() => handleSave(row.original, "ipv4")}
                                >
                                    <Check className="h-4 w-4" />
                                </Button>
                            </>
                        ) : (
                            <>
                                <code className="font-mono text-sm w-[130px] h-7 px-2 py-0.5 flex items-center justify-start bg-zinc-100 border border-zinc-200 rounded text-zinc-700 overflow-hidden">
                                    {row.original.currentIPV4 || "—"}
                                </code>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-7 w-7 text-zinc-500 hover:text-violet-500 shrink-0"
                                    onClick={() => {
                                        setEditing({ id: row.original.id, field: "ipv4" })
                                        setTempValue(row.original.currentIPV4 || "")
                                    }}
                                >
                                    <Pencil className="h-3.5 w-3.5" />
                                </Button>
                            </>
                        )}
                    </div>

                )
            },
        },
        {
            accessorKey: "currentIPV6",
            header: "IPv6",
            cell: ({ row }) => {
                const isEditing =
                    editing?.id === row.original.id && editing?.field === "ipv6"

                return (
                    <div className="flex items-center gap-2">
                        {isEditing ? (
                            <>
                                <Input
                                    autoFocus
                                    value={tempValue}
                                    onChange={(e) => setTempValue(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") handleSave(row.original, "ipv6")
                                    }}
                                    className="font-mono text-sm w-[130px] h-7 px-2 py-0 border border-zinc-200 rounded bg-zinc-50 text-zinc-700 focus-visible:ring-1 focus-visible:ring-violet-400 selection:text-white selection:bg-violet-500"
                                />
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-7 w-7 text-red-500 hover:text-red-700 shrink-0"
                                    onClick={() => setEditing(null)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-7 w-7 text-green-600 hover:text-green-700 shrink-0"
                                    onClick={() => handleSave(row.original, "ipv6")}
                                >
                                    <Check className="h-4 w-4" />
                                </Button>
                            </>
                        ) : (
                            <>
                                <code className="font-mono text-sm w-[130px] h-7 px-2 py-0.5 flex items-center justify-start bg-zinc-100 border border-zinc-200 rounded text-zinc-700 overflow-hidden">
                                    {row.original.currentIPV6 === "::1" ? "" : row.original.currentIPV6 || "—"}
                                </code>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-7 w-7 text-zinc-500 hover:text-violet-500 shrink-0"
                                    onClick={() => {
                                        setEditing({ id: row.original.id, field: "ipv6" })
                                        setTempValue(row.original.currentIPV6 === "::1" ? "" : row.original.currentIPV6 || "")
                                    }}
                                >
                                    <Pencil className="h-3.5 w-3.5" />
                                </Button>
                            </>
                        )}
                    </div>
                )
            },
        },
        {
            accessorKey: "createdAt",
            header: "Created At",
            cell: ({ getValue }) => {
                const date = new Date(getValue<string>())
                return `${String(date.getDate()).padStart(2, "0")}/${String(
                    date.getMonth() + 1
                ).padStart(2, "0")}/${String(date.getFullYear()).slice(-2)}`
            },
        },
        {
            accessorKey: "updatedAt",
            header: "Updated At",
            cell: ({ getValue }) => {
                const date = new Date(getValue<string>())
                return `${String(date.getDate()).padStart(2, "0")}/${String(
                    date.getMonth() + 1
                ).padStart(2, "0")}/${String(date.getFullYear()).slice(-2)}`
            },
        },
        {
            id: "actions",
            header: "",
            cell: ({ row }) => {
                const record = row.original

                const handleDelete = async () => {
                    toast.info(`Deleting ${record.domainName}...`)
                    await deleteRecord(record.id)
                }

                const handleEdit = () => {
                    toast.info(`Edit clicked for ${record.domainName}`)
                    // TODO: Hook this into your edit logic or modal
                }

                return (
                    <div className="flex justify-end">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 text-zinc-500 hover:text-violet-500 focus-visible:ring-1 focus-visible:ring-violet-400"
                                >
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-32">
                                <DropdownMenuLabel className="text-xs text-zinc-500">
                                    Actions
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={handleEdit}
                                    className="cursor-pointer text-zinc-700 hover:text-violet-600"
                                >
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={handleDelete}
                                    className="cursor-pointer text-red-600 focus:text-red-700"
                                >
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )
            },
        }

    ]

    const table = useReactTable({
        data: Array.isArray(records) ? records : [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    if (isFetchLoading)
        return (
            <div className="p-6 space-y-4 w-full">
                <Skeleton className="h-6 w-40" />
                {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-10 w-full" />
                ))}
            </div>
        )

    if (isFetchError)
        return (
            <div className="p-6 w-full">
                <h2 className="text-lg font-semibold mb-4 text-zinc-600">Records</h2>
                <div className="rounded-md border border-zinc-200 bg-white shadow-sm overflow-hidden">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead
                                            key={header.id}
                                            className="font-semibold text-zinc-700 bg-zinc-50"
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center text-red-600">
                                    Failed to load DNS records. Please try again later.
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        )

    if (!records?.length) {
        return (
            <div className="max-w-md mx-auto text-sm text-zinc-800">
                <h2 className="text-xl font-semibold mb-4">DNS Records</h2>
                <p className="mb-3 leading-relaxed text-zinc-600">
                    Configure DNS records to automatically map your domain to your server's IP
                    address.
                </p>
                <p className="leading-relaxed text-zinc-600">
                    Check the{" "}
                    <span className="font-semibold font-mono px-1 py-0.5 border border-zinc-200 rounded-md text-violet-500 cursor-pointer inline-flex items-center gap-1">
                        docs <GoIcon stroke="var(--color-violet-500)" height={16} width={16} />
                    </span>{" "}
                    to sync your IP, then click “Add Record” to get started.
                </p>

                <div className="flex gap-4 mt-6">
                    <Button className="bg-violet-500 hover:bg-violet-600 text-white flex items-center gap-2">
                        Add Record
                        <span className="inline-flex items-center font-mono ml-1 px-1 py-0.5 rounded-md bg-violet-600 text-xs">
                            <CmdIcon stroke="white" height={14} width={14} /> +N
                        </span>
                    </Button>
                    <Button variant="outline" className="text-zinc-700">
                        Learn More
                    </Button>
                </div>
            </div>
        )
    }
    return (
        <div className="p-6 w-full">
            <h2 className="text-lg font-semibold mb-4 text-zinc-600">Records</h2>

            <div className="rounded-md border border-zinc-200 bg-white shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className="font-semibold text-zinc-700 bg-zinc-50"
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id} className="hover:bg-zinc-50">
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default DNSRecords
