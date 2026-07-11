import { useState } from "react";
import EsewaForm from "./esewaForm";

const DIFFICULTY_STYLES = {
  EASY: { stripe: "bg-emerald-500", stamp: "border-emerald-500 text-emerald-400" },
  MEDIUM: { stripe: "bg-amber-500", stamp: "border-amber-500 text-amber-400" },
  HARD: { stripe: "bg-rose-500", stamp: "border-rose-500 text-rose-400" },
};


export default function BookCards({ books }) {
  const[loadesewa,setloadesewa]=useState(false)
  const[price,setprice]=useState(null)


  if(loadesewa){
  return(
  <EsewaForm price={price}></EsewaForm>

  )

  }

  return (
    <div className="bg-black">
      <h1 className="text-white">Added to cart books</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8 bg-neutral-950 min-h-screen">
      
      {books.map((book, i) => {
        const difficulty = (book.difficulty || "EASY").toUpperCase();
        const style = DIFFICULTY_STYLES[difficulty] || DIFFICULTY_STYLES.EASY;

        return (
          <div
            key={i}
            className="aspect-square flex flex-col rounded-xl overflow-hidden shadow-lg shadow-black/40 bg-neutral-800 border border-neutral-700"
          >
            <div className={`h-2 shrink-0 ${style.stripe}`} />

            <div className="flex-1 p-5 relative flex flex-col min-h-0">
              <span
                className={`absolute top-4 right-4 -rotate-6 border-2 border-dashed rounded px-2 py-0.5 text-xs font-mono uppercase tracking-wider ${style.stamp}`}
              >
                {difficulty}
              </span>

              <div className="flex items-center gap-2 pr-20">
                <span className="text-2xl">{book.emoji}</span>
                <p className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                  {book.genere}
                </p>
              </div>

              <h3 className="font-serif text-xl font-semibold text-neutral-50 mt-2 leading-snug line-clamp-2">
                {book.name}
              </h3>

              <p className="text-sm text-neutral-400 mt-2 leading-relaxed line-clamp-3">
                {book.description}
              </p>

              {book.topics?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {book.topics.slice(0, 3).map((topic, j) => (
                    <span
                      key={j}
                      className="text-xs font-mono uppercase tracking-wide bg-neutral-700 text-neutral-300 rounded-full px-2 py-0.5"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              )}

              {book.readtime && (
                <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-500 mt-3">
                 
                  <span>{book.readtime}</span>
                </div>
              )}

              <div className="flex-1" />

              <div className="border-t border-dashed border-neutral-600 my-3" />

              <div className="flex items-center justify-between">
                <div className="font-mono">
                  <span className="text-xs text-neutral-500 align-top mr-1">NPR</span>
                  <span className="text-xl font-bold text-neutral-50">{book.price}</span>
                </div>

                <button
                  onClick={()=>{setloadesewa(true)
                    setprice(book.price)
                  }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg font-semibold text-sm bg-neutral-50 text-neutral-900 hover:bg-neutral-300 transition-colors duration-150"
                >
                 BUY NOW
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
    </div>
  );
}