import { use } from 'react';
import { PlusIcon, FolderCogIcon, LayoutGridIcon } from 'lucide-react';
import { auth } from '@/lib/auth';

export default function Home() {
  const session = use(auth());

  return <div className=''></div>;
}
