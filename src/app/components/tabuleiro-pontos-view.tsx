import { CartaVagaoView } from "./carta-vagao-view";

export default function DeckArea(){
  return (
    <div className="flex items-center gap-4">
      <div className="w-20 h-28 bg-white rounded-md shadow flex items-center justify-center"> 
        <div className="text-xs">Deck</div>
      </div>

      <div className="flex gap-2">
        {/* face-up cards */}
        {["red","green","blue","yellow","black"].map((c,i) => (
          <CartaVagaoView key={i} color={c}/>
        ))}
      </div>

      <div className="w-12" />
      <div className="w-12 h-12 flex items-center justify-center">
        <button className="p-2 bg-white rounded shadow">🗑️</button>
      </div>
    </div>
  );
}
