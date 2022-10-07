import { useUserContext } from '@/context/UserContext';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Toast } from 'src/hooks/toast';

type Props = {};

const EditHouse = (props: Props) => {
  const router = useRouter();
  const [house, setHouse] = useState([]);
  const { setLoading } = useUserContext();

  const param = router.query;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  console.log('param', param);

  useEffect(() => {
    const getHome = async () => {
      try {
        const res = await axios.get(`https://633505ceea0de5318a0bacba.mockapi.io/api/house/` + `${param.id_home}`);
        if (res.data) {
          reset(res.data as any);
          console.log('data', res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getHome();
  }, [param.id_home]);
  const onSubmit = async (dataForm: any) => {
    setLoading(true);
    console.log('data', dataForm);
    try {
      await axios
        .put('https://633505ceea0de5318a0bacba.mockapi.io/api/house/' + `${param.id_home}`, dataForm)
        .then(() => {
          setLoading(false);

          router.push('/manager/landlord/list-home');
          Toast('success', 'Sửa nhà  thành công!');
        });
    } catch (error) {
      Toast('error', 'Đã xảy ra lỗi!');
    }
  };

  return (
    <div className="w-full ">
      <div className="grid grid-flow-col px-4 py-2 text-white bg-cyan-500 ">
        <div className="">
          <h2 className="pt-2 text-xl">Sửa nhà </h2>
        </div>
      </div>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Tên nhà
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Xin mời nhập tên nhà"
            {...register('name', { required: true, minLength: 6 })}
          />
          {errors.name?.type === 'required' && <span className="text-rose-600">Mời bạn nhập tên nhà</span>}
          {errors.name?.type === 'minLength' && <span className="text-rose-600">Tối thiểu 6 ký tự</span>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Địa chỉ
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="address"
            type="text"
            placeholder="Xin mời nhập địa chỉ"
            {...register('address', { required: true, minLength: 6 })}
          />
          {errors.address?.type === 'required' && <span className="text-rose-600">Mời bạn nhập tên nhà</span>}
          {errors.address?.type === 'minLength' && <span className="text-rose-600">Tối thiểu 6 ký tự</span>}
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sửa nhà
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditHouse;