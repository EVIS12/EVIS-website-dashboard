'use client';

import { BlogForm, Loader } from '@/app/_components';
import { SendArticle } from 'Blog';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { useAddArticleMutation } from '@/app/_redux/apiService/mainApi';
import { displayError, displaySuccess } from '@/app/_utils/functions';

export default function AddArticle() {
  const [
    addArticle,
    { isLoading: addingArticle, error: addError, isSuccess: articleAdded },
  ] = useAddArticleMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    setError,
    reset,
  } = useForm<SendArticle>({
    defaultValues: {
      body: EditorState.createEmpty(),
    },
  });

  const onSubmit = (formValue: SendArticle) => {
    const articleForm = new FormData();
    Object.entries(formValue).map(([key, value]) => {
      if (key === 'photo') {
        articleForm.append(key, formValue?.photo[0]);
      } else if (key === 'body') {
        if (
          draftToHtml(
            convertToRaw(formValue.body?.getCurrentContent())
          ).trim() !== '<p></p>'
        ) {
          articleForm.append(
            'body',
            draftToHtml(convertToRaw(value?.getCurrentContent()))
          );
        }
      } else {
        articleForm.append(key, value as string);
      }
    });
    addArticle(articleForm);
  };

  useMemo(() => {
    if (addError) {
      displayError(addError);
    }
  }, [addError]);

  useMemo(() => {
    if (articleAdded) {
      displaySuccess('Article added successfully');
      reset();
    }
  }, [articleAdded]);

  if (addingArticle) {
    return <Loader />;
  }

  return (
    <section className="section-pad">
      <div className="head mb-8">
        <h4 className=" text-main-dark font-semibold md:text-lg">Add Blog</h4>
      </div>
      <BlogForm
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        watch={watch}
        formType="add"
        image=""
        setValue={setValue}
        onSubmit={onSubmit}
      />
    </section>
  );
}
