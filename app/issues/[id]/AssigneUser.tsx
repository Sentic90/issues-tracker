'use client';

import { Select } from '@radix-ui/themes'
import React from 'react'

const AssigneUser = () => {
    
  return (
    <Select.Root>
        <Select.Trigger placeholder='Assgining to...'/>
        <Select.Content>
            <Select.Group>
                <Select.Item value="1">Ali Muhammed</Select.Item>
                <Select.Item value="2">Ibranh7a LI`</Select.Item>
                <Select.Item value="3">Kliom S$root</Select.Item>
            </Select.Group>
        </Select.Content>
    </Select.Root>
  )
}

export default AssigneUser