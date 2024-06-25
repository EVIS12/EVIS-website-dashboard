'use client';

import { BlogForm, Loader } from '@/app/_components';
import { SendArticle } from 'Blog';
import React, { useMemo } from 'react';
import {
  convertToRaw,
  EditorState,
  convertFromHTML,
  ContentState,
} from 'draft-js';
import { useForm } from 'react-hook-form';
import draftToHtml from 'draftjs-to-html';
import {
  useEditArticleMutation,
  useGetArticleInfoQuery,
} from '@/app/_redux/apiService/mainApi';
import { useParams } from 'next/navigation';
import { displayError, displaySuccess } from '@/app/_utils/functions';

export default function EditArticle() {
  const { id } = useParams();
  const {
    data: article,
    isLoading: articleLoading,
    error: articleError,
  } = useGetArticleInfoQuery({ id: id as string });

  const [
    editArticle,
    {
      isLoading: editingArticle,
      error: editArticleError,
      isSuccess: articleEdited,
    },
  ] = useEditArticleMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<SendArticle>();

  const onSubmit = (formValue: SendArticle) => {
    const articleForm = new FormData();
    Object.entries(formValue).map(([key, value]) => {
      if (key === 'photo') {
        formValue?.photo.length > 0 &&
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
    editArticle({ id: id as string, body: articleForm });
  };

  useMemo(() => {
    if (articleError) {
      displayError(articleError);
    }
  }, [articleError]);

  useMemo(() => {
    if (editArticleError) {
      displayError(editArticleError);
    }
  }, [editArticleError]);

  useMemo(() => {
    if (articleEdited) {
      displaySuccess('Article edited successfully');
    }
  }, [articleEdited]);

  if (articleLoading || editingArticle) return <Loader />;

  const sampleMarkup = article?.body ?? '';
  const blocksFromHTML = convertFromHTML(sampleMarkup);
  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );

  return (
    <section className="section-pad">
      <div className="head mb-8">
        <h4 className=" text-main-dark font-semibold md:text-lg">Edit Blog</h4>
      </div>
      <BlogForm
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        watch={watch}
        formType="edit"
        image={article?.photo as string}
        values={{ ...article, body: EditorState.createWithContent(state) }}
        setValue={setValue}
        onSubmit={onSubmit}
      />
    </section>
  );
}
