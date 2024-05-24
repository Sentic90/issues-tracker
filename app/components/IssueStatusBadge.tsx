import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import React from 'react'


interface Props{
    status: Status
}

// Record: Utility Classes in TypeScript which allow us to define 
//      Key value pair when key and values has particular types.
const statusMap: Record<Status, { label: string, color: "red"|"green" | 'violet'}> = {
    OPEN: { label: "Open", color: "red"},
    IN_PROGRESS: { label: "In Progress", color: "violet"},
    CLOSED: { label: "Closed", color: "green"},
}
const IssueStatusBadge = ({ status }: Props) => {

  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  )
}

export default IssueStatusBadge