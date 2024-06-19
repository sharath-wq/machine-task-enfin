import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { BASE_URL } from '@/constants';
import { CalendarIcon, Loader } from 'lucide-react';
import axios from 'axios';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { bookValidation } from '@/lib/validations';
import { toast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function AddBook() {
    const [open, setOpen] = useState(false);

    const form = useForm<z.infer<typeof bookValidation>>({
        resolver: zodResolver(bookValidation),
        defaultValues: {
            name: '',
            description: '',
            publishDate: new Date(),
            price: 0,
        },
    });

    async function onSubmit(values: z.infer<typeof bookValidation>) {
        try {
            await axios.post(`${BASE_URL}/books`, {
                ...values,
            });

            toast({
                description: 'new book added.',
            });
            form.reset();
            setOpen(false);
        } catch (error: any) {
            let errorMessage = 'There was a problem with your request.';

            if (error.response && error.response.data.errors && error.response.data.errors.length > 0) {
                errorMessage = error.response.data.errors.map((err: { message: string }) => err.message).join(', ');
            }

            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: errorMessage,
            });
        }
    }

    const { isSubmitting } = form.formState;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => setOpen(true)} variant='outline'>
                    Add New Book
                </Button>
            </DialogTrigger>
            <DialogContent>
                <div className='w-full max-w-xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8'>
                    <h1 className='text-2xl font-bold mb-4 dark:text-white'>Create New Book</h1>
                    <p className='text-gray-500 dark:text-gray-400 mb-6'>
                        Fill out the form below to add a new book to your list.
                    </p>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                            <div>
                                <FormField
                                    control={form.control}
                                    name='name'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder='Name' type='text' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div>
                                <FormField
                                    control={form.control}
                                    name='description'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder='Description' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div>
                                <FormField
                                    control={form.control}
                                    name='publishDate'
                                    render={({ field }) => (
                                        <FormItem className='flex flex-col'>
                                            <FormLabel>Published Date</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={'outline'}
                                                            className={cn(
                                                                'w-full pl-3 text-left font-normal',
                                                                !field.value && 'text-muted-foreground'
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(field.value, 'PPP')
                                                            ) : (
                                                                <span>Pick a date</span>
                                                            )}
                                                            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className='w-auto p-0' align='start'>
                                                    <Calendar
                                                        mode='single'
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        disabled={(date) =>
                                                            date > new Date() || date < new Date('1900-01-01')
                                                        }
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div>
                                <FormField
                                    control={form.control}
                                    name='price'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Price</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='Price'
                                                    type='number'
                                                    {...field}
                                                    onChange={(event) => field.onChange(+event.target.value)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <DialogFooter className='mt-6 flex justify-start'>
                                <Button type='submit'>{isSubmitting ? <Loader /> : 'Save Product'}</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
