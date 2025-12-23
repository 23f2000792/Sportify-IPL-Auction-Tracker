'use client';
import { useState, useEffect } from 'react';
import {
  collection,
  onSnapshot,
  doc,
  DocumentData,
  CollectionReference,
  DocumentReference,
  query,
  orderBy,
  Query,
} from 'firebase/firestore';
import { db } from './firebase';

export function useFirestoreCollection<T>(path: string, order?: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let collectionRef: Query<DocumentData> = collection(db, path) as CollectionReference<DocumentData>;
    if (order) {
        collectionRef = query(collectionRef, orderBy(order));
    }

    const unsubscribe = onSnapshot(
      collectionRef,
      (snapshot) => {
        try {
          const fetchedData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as T[];
          setData(fetchedData);
        } catch (e) {
          if (e instanceof Error) {
            setError(e);
          } else {
            setError(new Error('An unknown error occurred while fetching collection'));
          }
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [path, order]);

  return { data, loading, error };
}

export function useFirestoreDocument<T>(path: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!path || !path.includes('/')) {
        setLoading(false);
        setData(null);
        return;
    }
    const docRef = doc(db, path) as DocumentReference<DocumentData>;

    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        try {
          if (snapshot.exists()) {
            setData({ id: snapshot.id, ...snapshot.data() } as T);
          } else {
            setData(null);
          }
        } catch (e) {
          if (e instanceof Error) {
            setError(e);
          } else {
            setError(new Error('An unknown error occurred while fetching document'));
          }
        } finally {
            setLoading(false);
        }
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [path]);

  return { data, loading, error };
}
