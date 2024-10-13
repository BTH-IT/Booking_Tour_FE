import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { IDestination } from '@/types';
import destinationService from '@/services/DestinationService';

interface EditDestinationModalProps {
  isEditModalOpen: boolean;
  setIsEditModalOpen: Dispatch<SetStateAction<boolean>>;
  destinations: IDestination[];
  setDestinations: Dispatch<SetStateAction<IDestination[]>>;
  destination: IDestination;
}

const EditDestinationModal = ({
  isEditModalOpen,
  setIsEditModalOpen,
  destinations,
  setDestinations,
  destination,
}: EditDestinationModalProps) => {
  const { toast } = useToast();

  const formSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    description: z.string().min(1, { message: 'Description is required' }),
    url: z
      .string()
      .min(1, { message: 'URL is required' })
      .url({ message: 'Invalid URL' }),
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      url: '',
    },
  });

  useEffect(() => {
    if (destination) {
      form.setValue('name', destination.name);
      form.setValue('description', destination.description);
      form.setValue('url', destination.url);
    }
  }, [destination, form, isEditModalOpen]);

  const closeModal = () => {
    setIsEditModalOpen(false);
    form.reset();
  };

  const handleEditDestination = async (data: any) => {
    try {
      const res = await destinationService.updateDestination(data);
      if (res) {
        setDestinations([...destinations, res.result]);
        toast({
          duration: 2000,
          title: 'Destination updated successfully!',
        });
        closeModal();
      } else {
        console.error('Failed to update destination');
        toast({
          variant: 'destructive',
          duration: 2000,
          title: 'Failed to update destination!',
        });
      }
    } catch (error) {
      console.error('Failed to update destination:', error);
      toast({
        variant: 'destructive',
        duration: 2000,
        title: 'Failed to update destination!',
      });
    }
  };

  const onSubmit = async (values: FormValues) => {
    const data = {
      ...values,
      id: destination.id,
    };
    handleEditDestination(data);
  };

  return (
    <Dialog open={isEditModalOpen} onOpenChange={closeModal}>
      <DialogContent className="min-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-blue-600 text-3xl mb-4 text-center">
            Edit Destination
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl text-gray-800">Name</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full text-xl text-gray-900 py-[20px] focus-visible:ring-0 focus-visible:ring-offset-0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl text-gray-800">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full text-xl text-gray-900 py-[20px] focus-visible:ring-0 focus-visible:ring-offset-0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl text-gray-800">URL</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full text-xl text-gray-900 py-[20px] focus-visible:ring-0 focus-visible:ring-offset-0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full text-center">
              <Button
                key={form.formState.isSubmitting ? 'loading' : 'submit'}
                variant="primary"
                type="submit"
                className="text-xl py-8 px-6 mt-4"
                disabled={form.formState.isSubmitting}
              >
                Edit Destination
                {form.formState.isSubmitting && (
                  <div className="w-4 h-4 ml-3 border-2 border-white border-solid rounded-full animate-spin border-t-transparent"></div>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDestinationModal;
