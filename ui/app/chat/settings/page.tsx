import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, MonitorCog, MoreHorizontalIcon, Plus, Settings2, UserKey, Users, Users2 } from "lucide-react";
import { use } from "react";

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

const users : User[] = [ 
    {"username" : "mohamedelafia" , "password" :"$2b$12$PJJ8uG3MZMdvqktuPZJmJeN.94Tv6wqfuq/xsker/AVeBlb3bA68W" , "roles" : ["SUPER"] , "isActive" : true , "isSudoer" : true}
]
const roles : Role[] = [
    {roleName : "SUPER" , allowedCommands : ["*"] },
    {roleName : "DEV" , allowedCommands : ["ls" , "cat" , "cd"]}
]


export default function Settings() { 
    return (
        <div className="px-16 py-20">
            <div className="mb-8">
                <h1 className="text-2xl font-bold flex items-center mb-2"><Settings2 className="me-2"/> Settings</h1>
                <p>manage your all settings here</p>
            </div>
            <Tabs defaultValue="general" className="w-full">
                <TabsList className="mb-6 w-full">
                    <TabsTrigger value="general"><MonitorCog/>General</TabsTrigger>
                    <TabsTrigger value="users"><Users/>Users</TabsTrigger>
                    <TabsTrigger value="security"><Lock/>Security</TabsTrigger>
                    <TabsTrigger value="roles"><UserKey/>Roles</TabsTrigger>
                </TabsList>
                <Card className="px-6">
                    <TabsContent value="general">Make changes to your account here.</TabsContent>
                    <TabsContent value="users">
                        <div className="flex justify-between">
                            <h2 className="flex"><Users2/><span className="text-lg ms-2 font-bold">Users</span></h2>
                            <Button variant="default"><Plus/>Add user</Button>
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
                    </TabsContent>
                    <TabsContent value="security">Change your password here.</TabsContent>
                    <TabsContent value="roles">
                        <div className="flex justify-between">
                            <div>
                                <h2 className="flex mb-2"><Users2/><span className="text-lg ms-2 font-bold">Users</span></h2>
                                <p>manage the roles here</p>
                            </div>
                            <Button variant="default"><Plus/>Add role</Button>
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
                    </TabsContent>
                </Card>
            </Tabs>
        </div>
    )
}