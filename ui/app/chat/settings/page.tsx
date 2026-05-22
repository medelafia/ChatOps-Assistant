import RolesSettings from "@/components/roles-settings";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UsersSettings from "@/components/users-settings";
import { Lock, MonitorCog, MoreHorizontalIcon, Plus, Settings2, UserKey, Users, Users2 } from "lucide-react";
import { use } from "react";


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
                        <UsersSettings />
                    </TabsContent>
                    <TabsContent value="security">Change your password here.</TabsContent>
                    <TabsContent value="roles">
                        <RolesSettings />
                    </TabsContent>
                </Card>
            </Tabs>
        </div>
    )
}