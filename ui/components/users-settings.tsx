"use client";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Lock, MoreHorizontalIcon, Plus, SearchIcon, Settings2, UserRoundPlus, Users2 } from "lucide-react";
import { Button } from "./ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Label } from "./ui/label";
import { Combobox, ComboboxChip, ComboboxChips, ComboboxChipsInput, ComboboxContent, ComboboxEmpty, ComboboxItem, ComboboxList, ComboboxValue, useComboboxAnchor } from "@/components/ui/combobox";
import React, { useEffect, useState } from "react";

type User = { 
    username : string ; 
    password : string ; 
    roles : string[] ; 
    isActive : boolean; 
    isSudoer :  boolean
}

type Role = { 
    roleName : string ; 
    allowedCommands : string[]; 
}

export default function UsersSettings() { 
    const anchor = React.useRef<HTMLDivElement | null>(null)
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [ users , setUsers ]= React.useState<User[]>([])
    const [roles , setRoles ] =React.useState<Role[]>([])


    useEffect(()=>{
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/users` , {
            credentials : "include"
        }) 
        .then(res => {
            if(res.ok) return res.json()
        })
        .then(data => {
            console.log(data)
            setUsers(data)
        })
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/roles` , {
            credentials : "include"
        }) 
        .then(res => {
            if(res.ok) return res.json()
        })
        .then(data => {
            setRoles(data)
        })
    }, [] )

    return (
    <>
       <div className="flex justify-between">
            <h2 className="flex"><Users2/><span className="text-lg ms-2 font-bold">Users</span></h2>
            <Drawer direction="right">
                <DrawerTrigger asChild>
                    <Button>
                        <Plus/>Add user
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle className="text-2xl font-bold">Create new user</DrawerTitle>
                        <DrawerDescription>This action cannot be undone.</DrawerDescription>
                    </DrawerHeader>
                    <div className="py-6 px-4">
                        <InputGroup className="my-4">
                            <InputGroupInput placeholder="username..." />
                            <InputGroupAddon>
                                <UserRoundPlus />
                            </InputGroupAddon>
                        </InputGroup>
                        <div className="flex my-4">
                            <InputGroup>
                                <InputGroupInput placeholder="password..." />
                                <InputGroupAddon>
                                    <Lock />
                                </InputGroupAddon>
                            </InputGroup>
                            <Button className="ms-2">generate</Button>
                        </div>
                        <Combobox
                            multiple
                            autoHighlight
                            items={roles.map(val => val.roleName)}
                            value={selectedRoles} 
                            onValueChange={(val) => {setSelectedRoles(val)

                                console.log(val)
                            }}
                            >
                            <ComboboxChips className="w-full ">
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
                            <ComboboxContent>
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
                        <div className="flex items-center space-x-2 my-4">
                            <Switch id="airplane-mode" />
                            <Label htmlFor="airplane-mode">Is sudoer ?</Label>
                        </div>
                        <div className="flex items-center space-x-2 my-4">
                            <Switch id="airplane-mode" />
                            <Label htmlFor="airplane-mode">Is active ?</Label>
                        </div>
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
                    <TableHead>Username</TableHead>
                    <TableHead>Password</TableHead>
                    <TableHead>Roles</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Is sudoer</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                { users?.map((user , key)=>(
                <TableRow key={key}>
                    <TableCell className="font-medium">{user.username}</TableCell>
                    <TableCell>{user.password}</TableCell>
                    <TableCell className="flex items-center">
                        {user.roles.map((role , key) => (
                            <Badge key={key} className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">{role}</Badge>
                        ))}
                        
                        <Button variant="ghost"><Settings2/></Button>
                    </TableCell>
                    <TableCell><Switch checked={user.isActive}/></TableCell>
                        <TableCell><Switch checked={user.isSudoer}/></TableCell>
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
                                !user.roles.includes("SUPER") &&
                                <>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem variant="destructive">
                                        Delete
                                    </DropdownMenuItem>
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