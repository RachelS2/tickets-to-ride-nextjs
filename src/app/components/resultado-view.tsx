import { useState } from "react";


interface Player {
nome: string;
pontos: number;
}


interface PlayersModalProps {
players: Player[];
}


export default function PlayersModal({ players }: PlayersModalProps) {
const [open, setOpen] = useState(false);


const sortedPlayers = [...players].sort((a, b) => b.pontos - a.pontos);


return (
<div>
<button
onClick={() => setOpen(true)}
className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition"
>
Ver Ranking
</button>


{open && (
<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
<div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
<div className="flex justify-between items-center mb-4">
<h2 className="text-xl font-semibold">Ordem dos Jogadores</h2>
<button
onClick={() => setOpen(false)}
className="text-gray-600 hover:text-black"
>
✕
</button>
</div>


<div className="space-y-3 mt-2">
{sortedPlayers.map((player, index) => (
<div
key={player.nome}
className="p-4 border rounded-xl flex justify-between items-center shadow-sm"
>
<span className="text-lg font-medium">{index + 1}. {player.nome}</span>
<span className="text-lg font-bold">{player.pontos} pts</span>
</div>
))}
</div>
</div>
</div>
)}
</div>
);
}