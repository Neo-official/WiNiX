'use client'

import { useEffect, useState } from 'react'
import { DataTable } from '@/components/ui/data-table'
import type { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { WorkTime } from '@/types'
import { storage } from '@/lib/utils/storage'
import { TableActions } from '@/components/table-actions'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import config from "@/config";
import { WORK_TIMES_KEY } from "@/lib/utils/db";

export default function WorkTimes() {
  const [data, setData] = useState<WorkTime[]>([])
  const [editingItem, setEditingItem] = useState<WorkTime | null>(null)

  useEffect(() => {
    const savedData = storage.get(WORK_TIMES_KEY)
    setData(savedData)
  }, [])

  const columns: ColumnDef<WorkTime>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'work_start',
      header: 'Work Start',
      cell: ({ row }) => format(row.original.work_start, 'PPpp'),
    },
    {
      accessorKey: 'work_end',
      header: 'Work End',
      cell: ({ row }) => format(row.original.work_end, 'PPpp'),
    },
    {
      accessorKey: 'mission_start',
      header: 'Mission Start',
      cell: ({ row }) => format(row.original.mission_start, 'PPpp'),
    },
    {
      accessorKey: 'mission_end',
      header: 'Mission End',
      cell: ({ row }) => format(row.original.mission_end, 'PPpp'),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <TableActions
          onEdit={() => setEditingItem(row.original)}
          onDelete={() => handleDelete(row.original.id)}
        />
      ),
    },
  ]

  const handleAdd = () => {
    const newId = Math.max(...data.map(item => item.id), 0) + 1
    const newItem: WorkTime = {
      id: newId,
      work_start: Date.now(),
      work_end: Date.now(),
      mission_start: Date.now(),
      mission_end: Date.now(),
    }
    const newData = [...data, newItem]
    setData(newData)
    storage.set(WORK_TIMES_KEY, newData)
    setEditingItem(newItem) // Open edit dialog for the new item
  }

  const handleEdit = (updatedItem: WorkTime) => {
    const newData = data.map(item =>
      item.id === updatedItem.id ? updatedItem : item
    )
    setData(newData)
    storage.set(WORK_TIMES_KEY, newData)
    setEditingItem(null)
  }

  const handleDelete = (id: number) => {
    const newData = data.filter(item => item.id !== id)
    setData(newData)
    storage.set(WORK_TIMES_KEY, newData)
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable
          columns={columns}
          data={data}
          importFilename={WORK_TIMES_KEY}
          onAdd={handleAdd}

          title={config.ROUTES.workTimes.label}/>

      <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingItem?.id ? 'Edit Work Time' : 'Add Work Time'}
            </DialogTitle>
          </DialogHeader>
          {editingItem && (
            <div className="space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="work_start">Work Start</Label>
                <Input
                  type="datetime-local"
                  id="work_start"
                  value={format(editingItem.work_start, "yyyy-MM-dd'T'HH:mm")}
                  onChange={(e) => setEditingItem({
                    ...editingItem,
                    work_start: new Date(e.target.value).getTime(),
                  })}
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="work_end">Work End</Label>
                <Input
                  type="datetime-local"
                  id="work_end"
                  value={format(editingItem.work_end, "yyyy-MM-dd'T'HH:mm")}
                  onChange={(e) => setEditingItem({
                    ...editingItem,
                    work_end: new Date(e.target.value).getTime(),
                  })}
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="mission_start">Mission Start</Label>
                <Input
                  type="datetime-local"
                  id="mission_start"
                  value={format(editingItem.mission_start, "yyyy-MM-dd'T'HH:mm")}
                  onChange={(e) => setEditingItem({
                    ...editingItem,
                    mission_start: new Date(e.target.value).getTime(),
                  })}
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="mission_end">Mission End</Label>
                <Input
                  type="datetime-local"
                  id="mission_end"
                  value={format(editingItem.mission_end, "yyyy-MM-dd'T'HH:mm")}
                  onChange={(e) => setEditingItem({
                    ...editingItem,
                    mission_end: new Date(e.target.value).getTime(),
                  })}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setEditingItem(null)}
                >
                  Cancel
                </Button>
                <Button color={'primary'} onClick={() => handleEdit(editingItem)}>
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
