import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faMoneyBill, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Toast } from 'src/hooks/toast';
import { useUserContext } from '@/context/UserContext';
import axios from 'axios';
type Props = {};

const ListRoom = (props: Props) => {
  const { setLoading } = useUserContext();
  const router = useRouter();
  const idd = router.query;
  console.log('id nhà', idd.id);

  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    const getRoom = async () => {
      try {
        const res = await axios.get(`https://633505ceea0de5318a0bacba.mockapi.io/api/house/${idd.id}/room`);
        if (res.data) {
          setRooms(res.data as any);
          console.log('data', res.data);
        }
      } catch (error) {
        console.log('error', error);
      }
    };
    getRoom();
  }, [idd.id]);

  const removeRoom = async (id: number) => {
    console.log('id phòng', id);
    setLoading(true);
    const confirm = window.confirm('Bạn có muốn xóa không?');
    if (confirm) {
      try {
        await axios.delete(`https://633505ceea0de5318a0bacba.mockapi.io/api/house/${idd.id}/room/` + id).then(() => {
          Toast('success', 'Xóa phòng thành công');
          setRooms(rooms.filter((item: any) => item.id !== id));
          setLoading(false);
        });
      } catch (error) {
        Toast('error', 'Xóa phòng không thành công');
        setLoading(false);
      }
    }
  };

  const findData = (dataA: any) => {
    const data = dataA.filter((item: any) => item.houseId == idd.id);
    return data;
  };
  return (
    <div className="h-auto">
      <header className="bg-white shadow">
        <div className="max-w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-2xl sm:truncate uppercase">
                Quản lý phòng
              </h2>
            </div>
            <div className="mt-5 flex lg:mt-0 lg:ml-4">
              <Link href={`/manager/landlord/${idd.id}/list-room/add`}>
                <a className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Thêm mới
                </a>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="max-w-full mx-auto py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col">
            <div className="sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full ">
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 drop-shadow-xl ">
                  {rooms &&
                    findData(rooms).map((item: any, index: React.Key | null | undefined) => {
                      return (
                        <div className="w-full border-2 p-[20px] bg-white rounded-[5px]" key={index}>
                          <h2 className="text-xl flex items-center gap-2 mb-[20px]">
                            <FontAwesomeIcon className="h-[15px]" icon={faHouse} />
                            {item.name}
                          </h2>
                          <Link
                            href="/manager/landlord/room-renter/add"
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 inline-block"
                          >
                            <a className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 inline-block mb-[20px]">
                              Thêm khách
                            </a>
                          </Link>

                          <p className="flex items-center gap-2 mb-[20px]">
                            <FontAwesomeIcon className="h-[15px]" icon={faMoneyBill} />
                            <span className="text-red-500">
                              {item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                            </span>
                          </p>

                          <div className="text-center flex gap-3">
                            <Link
                              href={`/manager/landlord/${idd.id}/list-room/${item.id}/edit`}
                              className="text-amber-500 hover:text-amber-600"
                            >
                              <a className="text-amber-500 hover:text-amber-600 flex gap-1 items-center">
                                <FontAwesomeIcon className="h-[20px]" icon={faPenToSquare} /> Chỉnh sửa
                              </a>
                            </Link>
                            <button
                              onClick={() => {
                                removeRoom(item.id);
                              }}
                              className="btn text-red-500 hover:text-red-600 flex gap-1 items-center"
                            >
                              <FontAwesomeIcon className="h-[20px]" icon={faTrash} /> Xóa
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ListRoom;
