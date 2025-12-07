import React from 'react'
import Link from "next/link";
import {cn} from "@/lib/utils";

import BookCover from "@/components/BookCover";


const BookCard = ({id, title, genre, coverColor, coverUrl, isLoanedBook = false}: Book) =>  (
         <li className={cn(isLoanedBook && 'xs:w-52 w-full')}>
            <Link href={`/books/${id}`} className={cn( isLoanedBook && 'w-full flex flex-col items-center')}>
                <BookCover coverColor={coverColor} coverImage={coverUrl}/>
            </Link>
        </li>
)

export default BookCard
