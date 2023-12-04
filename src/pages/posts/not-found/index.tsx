import { useRouter } from "next/router";

import styles from '../../../styles/notFoundPost.module.scss';

export default function NotFoundPost() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div className={styles.container}>
      Postagem com id { `'${slug}'` } não existe
    </div>
  )
}