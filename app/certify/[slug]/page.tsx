// app/[slug]/page.tsx

import { FC } from 'react';
import { useRouter } from 'next/navigation';

interface Params {
    slug: string;
}

const SlugPage: FC<{ params: Params }> = async ({ params }) => {
    const { slug } = params;

    return (
        <div>
            <h1>Slug Page</h1>
            <p>Your slug: {slug}</p>
        </div>
    );
};

export default SlugPage;
