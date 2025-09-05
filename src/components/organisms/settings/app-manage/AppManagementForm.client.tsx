'use client';
import {
  Card,
  Button,
  Stack,
  TextField,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import {HTMLAttributes, FC, useEffect} from 'react';
import {Controller, useFieldArray, useFormContext} from 'react-hook-form';
import PostbackSearchParamsSelect from '@/components/molecules/PostbackSearchParamsSelect.client';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {z} from 'zod';

interface Props extends HTMLAttributes<HTMLFormElement> {
  formType: 'CREATE' | 'UPDATE';
}

export const schema = z.object({
  name: z.string().min(1, {message: 'app 이름을 입력해주세요.'}),
  description: z.string().min(1, {message: 'app 설명을 입력해주세요.'}),
  key: z.string().min(1, {message: 'app key를 입력해주세요.'}),
  hashKey: z.string().min(1, {message: 'hash key를 입력해주세요.'}),
  postbackUrl: z.string().min(1, {message: 'postback url을 입력해주세요.'}),
  postbackDomain: z
    .string()
    .min(1, {message: 'postback domain을 입력해주세요.'}),
  postbackSearchParams: z.array(
    z.object({
      key: z.string().min(1, {message: 'key를 입력해주세요.'}),
      value: z.string().min(1, {message: 'value를 입력해주세요.'}),
    }),
  ),
});

export type AppManagementFormType = z.infer<typeof schema>;

const AppManagementForm: FC<Props> = ({formType, ...props}) => {
  const {
    control,
    register,
    setValue,
    watch,
    formState: {errors},
  } = useFormContext<AppManagementFormType>();

  const {fields, append, remove} = useFieldArray({
    control,
    name: 'postbackSearchParams',
  });

  const postbackSearchParams = watch('postbackSearchParams');
  const postbackDomain = watch('postbackDomain');
  const handleAppendPostbackSearchParams = () => {
    append({key: '', value: ''});
  };

  useEffect(() => {
    const domain = postbackDomain || '';
    if (Array.isArray(postbackSearchParams)) {
      let queryString = '';
      const length = postbackSearchParams.length;
      postbackSearchParams.forEach((param, index) => {
        if (param.key) {
          queryString += `${param.key}={${param.value}}`;
          if (index < length - 1) {
            queryString += '&';
          }
        }
      });

      setValue(
        'postbackUrl',
        queryString ? `${domain}?${queryString}` : domain,
      );
    } else {
      setValue('postbackUrl', domain);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postbackDomain, JSON.stringify(postbackSearchParams), setValue]);

  return (
    <form {...props}>
      <Stack spacing={4}>
        <Card sx={{p: 2, borderRadius: 2}} elevation={2}>
          <Typography variant="subtitle2">Info</Typography>
          <Stack mt={3} spacing={2}>
            <TextField
              {...register('name')}
              label="app name"
              fullWidth
              size="small"
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            <TextField
              {...register('description')}
              label="app description"
              fullWidth
              size="small"
              multiline
              minRows={3}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          </Stack>
        </Card>

        <Card sx={{p: 2, borderRadius: 2}} elevation={2}>
          <Typography variant="subtitle2">Config</Typography>
          <Stack mt={3} spacing={2}>
            <TextField
              {...register('key')}
              label="app key"
              fullWidth
              size="small"
              error={!!errors.key}
              helperText={errors.key?.message}
              disabled={formType === 'UPDATE'}
            />
            <TextField
              {...register('hashKey')}
              label="hash key"
              fullWidth
              size="small"
              error={!!errors.hashKey}
              helperText={errors.hashKey?.message}
            />

            <Controller
              control={control}
              name="postbackUrl"
              render={({field}) => (
                <TextField
                  {...field}
                  label="postback url"
                  size="small"
                  slotProps={{
                    input: {readOnly: true},
                    inputLabel: {shrink: !!field.value},
                  }}
                  error={!!errors.postbackUrl}
                  helperText={
                    errors.postbackUrl?.message ||
                    'postback url은 postback domain과 search param을 조합하여 자동으로 생성됩니다.'
                  }
                />
              )}
            />

            <Stack spacing={2} direction="row">
              <TextField
                {...register('postbackDomain')}
                label="postback domain"
                fullWidth
                size="small"
                error={!!errors.postbackDomain}
                helperText={errors.postbackDomain?.message}
              />
              <Stack spacing={2} width="100%">
                {fields.map((param, index) => (
                  <Stack key={index} direction="row" spacing={2} width="100%">
                    <TextField
                      {...register(`postbackSearchParams.${index}.key`)}
                      label="search param key"
                      fullWidth
                      size="small"
                      error={!!errors.postbackSearchParams}
                      helperText={errors.postbackSearchParams?.message}
                    />

                    <Controller
                      control={control}
                      name={`postbackSearchParams.${index}.value`}
                      render={({field}) => (
                        <PostbackSearchParamsSelect
                          {...field}
                          fullWidth
                          label="search param value"
                          size="small"
                          error={!!errors.postbackSearchParams}
                          helperText={errors.postbackSearchParams?.message}
                        />
                      )}
                    />
                    <IconButton onClick={() => remove(index)}>
                      <DeleteIcon fontSize="small" color="error" />
                    </IconButton>
                  </Stack>
                ))}
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleAppendPostbackSearchParams}
                  startIcon={<AddIcon />}
                >
                  Add
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </form>
  );
};

export default AppManagementForm;
