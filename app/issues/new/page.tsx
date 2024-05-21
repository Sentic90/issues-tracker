"use client";

import { Button, TextField } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller} from 'react-hook-form';
import "easymde/dist/easymde.min.css";
import axios from 'axios'
import React from 'react'
import { useRouter } from 'next/navigation';


interface IssueForm { 
  title: string;
  description: string;
}
const NewIssuePage = () => {
  const router = useRouter()
  const {register, control, handleSubmit} = useForm<IssueForm>()
  return (
    <form 
      className='space-y-3 max-w-xl'
      onSubmit={handleSubmit(async (data) => {
        await axios.post('/api/issues', data);
        router.push("/issues")
      })}
      >
        <TextField.Root 
        {...register('title')}
        className='py-5 px-4' 
        placeholder='Title of issue...'/>

        <Controller 
        name='description'
        control={control}
        render={({ field }) => <SimpleMDE placeholder="description" {...field}/>}
        />
        
        <Button>Submit New Issue</Button>
    </form>
  )
}

export default NewIssuePage