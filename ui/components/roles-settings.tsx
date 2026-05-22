import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { MoreHorizontalIcon, Plus, UserRoundPlus, Users2 } from "lucide-react";
import { Button } from "./ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "./ui/badge";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Combobox, ComboboxChip, ComboboxChips, ComboboxChipsInput, ComboboxContent, ComboboxEmpty, ComboboxItem, ComboboxList, ComboboxValue, useComboboxAnchor } from "./ui/combobox";
import React, { useState } from "react";

type Role = { 
    roleName : string ; 
    allowedCommands : string[]; 
}

const roles : Role[] = [
    {roleName : "SUPER" , allowedCommands : ["*"] },
    {roleName : "DEV" , allowedCommands : ["ls" , "cat" , "cd"]}
]

export default function RolesSettings() { 
    const anchor = useComboboxAnchor()
    const [selectedRoles, setSelectedRoles] = useState([]);
    return (
    <>
        <div className="flex justify-between">
            <div>
                <h2 className="flex mb-2"><Users2/><span className="text-lg ms-2 font-bold">Users</span></h2>
                <p>manage the roles here</p>
            </div>
            <Drawer direction="right">
                <DrawerTrigger asChild>
                    <Button>
                        <Plus/>Add role
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle className="text-2xl font-bold">Create new role</DrawerTitle>
                        <DrawerDescription>This action cannot be undone.</DrawerDescription>
                    </DrawerHeader>
                    <div className="py-6 px-4">
                        <InputGroup className="my-4">
                            <InputGroupInput placeholder="role name..." />
                            <InputGroupAddon>
                                <UserRoundPlus />
                            </InputGroupAddon>
                        </InputGroup>
                        <Combobox
                            multiple
                            autoHighlight
                            items={roles.map(val => val.roleName)}
                            value={selectedRoles} 
                            onValueChange={setSelectedRoles}
                            >
                            <ComboboxChips ref={anchor} className="w-full ">
                                <ComboboxValue>
                                {(values) => (
                                    <React.Fragment>
                                    {values.map((value: string) => (
                                        <ComboboxChip key={value}>{value}</ComboboxChip>
                                    ))}
                                    <ComboboxChipsInput />
                                    </React.Fragment>
                                )}
                                </ComboboxValue>
                            </ComboboxChips>
                            <ComboboxContent anchor={anchor}>
                                <ComboboxEmpty>No items found.</ComboboxEmpty>
                                <ComboboxList>
                                {(item) => (
                                    <ComboboxItem key={item} value={item}>
                                    {item}
                                    </ComboboxItem>
                                )}
                                </ComboboxList>
                            </ComboboxContent>
                        </Combobox>
                    </div>
                    <DrawerFooter>
                        <Button>Save</Button>
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
        <Table className="mt-4">
            <TableHeader>
                <TableRow>
                    <TableHead>Role name</TableHead>
                    <TableHead>Allowed commands</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                { roles?.map((role , key)=>(
                <TableRow key={key}>
                    <TableCell className="font-medium">{role.roleName}</TableCell>
                    <TableCell className="flex items-center">
                        {role.allowedCommands.map((command , key) => (
                            <Badge key={key} variant="secondary">{command}</Badge>
                        ))}
                        {!role.allowedCommands.includes("*") && <Button variant="ghost"><Plus/></Button>}
                    </TableCell>
                    <TableCell className="text-right">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="size-8">
                                <MoreHorizontalIcon />
                                <span className="sr-only">Open menu</span>
                            </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            
                            {
                                role.roleName != "SUPER" && 
                                <>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                                </> 
                            }
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>))}
            </TableBody>
        </Table>
    </>
    )
}