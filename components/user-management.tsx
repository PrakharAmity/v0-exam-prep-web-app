"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, UserPlus, Mail, Ban, Shield } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: "student" | "teacher" | "admin"
  status: "active" | "inactive" | "suspended"
  joinDate: string
  lastActive: string
  filesUploaded: number
  studyPlansGenerated: number
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@email.com",
    role: "student",
    status: "active",
    joinDate: "2024-01-10",
    lastActive: "2024-01-15",
    filesUploaded: 5,
    studyPlansGenerated: 2,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@email.com",
    role: "teacher",
    status: "active",
    joinDate: "2024-01-08",
    lastActive: "2024-01-15",
    filesUploaded: 12,
    studyPlansGenerated: 8,
  },
  {
    id: "3",
    name: "Bob Wilson",
    email: "bob.wilson@email.com",
    role: "student",
    status: "inactive",
    joinDate: "2024-01-05",
    lastActive: "2024-01-12",
    filesUploaded: 2,
    studyPlansGenerated: 1,
  },
  {
    id: "4",
    name: "Alice Brown",
    email: "alice.brown@email.com",
    role: "admin",
    status: "active",
    joinDate: "2023-12-15",
    lastActive: "2024-01-15",
    filesUploaded: 25,
    studyPlansGenerated: 15,
  },
]

export function UserManagement() {
  const [users] = useState<User[]>(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesRole && matchesStatus
  })

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return (
          <Badge variant="default" className="bg-purple-100 text-purple-800">
            Admin
          </Badge>
        )
      case "teacher":
        return (
          <Badge variant="default" className="bg-blue-100 text-blue-800">
            Teacher
          </Badge>
        )
      case "student":
        return <Badge variant="outline">Student</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Active
          </Badge>
        )
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>
      case "suspended":
        return <Badge variant="destructive">Suspended</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-blue-600" />
            <span className="font-medium text-blue-800">Total Users</span>
          </div>
          <p className="text-2xl font-bold text-blue-600 mt-1">{users.length}</p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center space-x-2">
            <UserPlus className="h-5 w-5 text-green-600" />
            <span className="font-medium text-green-800">Active Users</span>
          </div>
          <p className="text-2xl font-bold text-green-600 mt-1">{users.filter((u) => u.status === "active").length}</p>
        </div>
        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-purple-600" />
            <span className="font-medium text-purple-800">Teachers</span>
          </div>
          <p className="text-2xl font-bold text-purple-600 mt-1">{users.filter((u) => u.role === "teacher").length}</p>
        </div>
        <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
          <div className="flex items-center space-x-2">
            <UserPlus className="h-5 w-5 text-orange-600" />
            <span className="font-medium text-orange-800">Students</span>
          </div>
          <p className="text-2xl font-bold text-orange-600 mt-1">{users.filter((u) => u.role === "student").length}</p>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="teacher">Teacher</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Users Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead>Activity</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </TableCell>
                <TableCell>{getRoleBadge(user.role)}</TableCell>
                <TableCell>{getStatusBadge(user.status)}</TableCell>
                <TableCell className="text-sm">{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                <TableCell className="text-sm">{new Date(user.lastActive).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p>{user.filesUploaded} files</p>
                    <p className="text-muted-foreground">{user.studyPlansGenerated} plans</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm">
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Shield className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Ban className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
