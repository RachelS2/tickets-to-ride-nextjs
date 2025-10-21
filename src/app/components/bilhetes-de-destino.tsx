import { Card } from "@/app/components/ui/card";
import { BilheteDestino } from "../lib/cartas-jogo";
import { NomesDeCidades } from "../lib/cidades";
import { RotaCidades } from "../lib/cidades";
// import { DestinosCidades } from "../lib/cidades";

type BilhetesDestinoProps = {
  bilheteDestino: BilheteDestino;
};

export const BilhetesDestinoView = ({ bilheteDestino }: BilhetesDestinoProps) => {
  return (
    <Card className="p-3 text-sm">
      <div className="space-y-1">
        <div>
          <span className="text-muted-foreground">Origem: </span>
          <span className="font-medium">{bilheteDestino.Origem}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Destino: </span>
          <span className="font-medium">{bilheteDestino.Destino}</span>
        </div>
      </div>
    </Card>
  );
};
