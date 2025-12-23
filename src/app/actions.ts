'use server';
import { revalidatePath } from 'next/cache';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { House } from '@/types';

type UpdateHousePayload = Partial<Omit<House, 'id' | 'squad'>> & {
  squad?: Partial<House['squad']>;
};

export async function updateHouseData(houseId: string, data: UpdateHousePayload) {
  try {
    const houseRef = doc(db, 'houses', houseId);
    
    // Firestore's updateDoc can handle nested updates with dot notation
    const updateData: { [key: string]: any } = {};
    for (const key in data) {
      if (key === 'squad' && data.squad) {
        for (const squadKey in data.squad) {
          updateData[`squad.${squadKey}`] = data.squad[squadKey as keyof typeof data.squad];
        }
      } else if (key !== 'squad') {
        updateData[key] = data[key as keyof typeof data];
      }
    }

    await updateDoc(houseRef, updateData);

    revalidatePath('/admin');
    revalidatePath(`/admin/edit/${houseId}`);
    revalidatePath('/');
    revalidatePath(`/house/${houseId}`);
    
    return { success: true, message: 'House updated successfully.' };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, message };
  }
}
