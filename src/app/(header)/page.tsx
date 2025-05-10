// 'use client';

import { cookies } from 'next/headers';

export default async function HomePage() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken');
  console.log(refreshToken);
  // const accessToken = useAtomValue(accessTokenAtom);
  // const isLoggedIn = useAtomValue(isLoggedInAtom);

  return (
    <div>
      {/* <p>{'accessToken = ' + accessToken}</p>
      <p>{'isLoggedIn = ' + isLoggedIn}</p> */}
    </div>
  );
}
