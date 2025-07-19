import toast from "react-hot-toast";
import { BadgeData, MessageType } from "./messageTypes";

const customToast = (data: BadgeData) => {
  const newBadge = data.NewBadge;
  const prevBadge = data.PrevBadge;
  
  return (
    <div 
      className="flex items-center gap-3 p-4 rounded-lg shadow-lg border min-w-[320px] relative overflow-hidden"
      style={{
        background: 'linear-gradient(270deg, hsl(var(--secondary)) 0%, #000 100%)',
        borderColor: 'hsl(var(--secondary) / 0.3)',
        position: 'relative',
        zIndex: 1,
      }}
    >
      {/* Background overlay to ensure gradient shows */}
      <div 
        className="absolute inset-0 rounded-lg"
        style={{
          background: 'linear-gradient(90deg, hsl(var(--secondary)) 0%, #000 100%)',
          zIndex: -1,
        }}
      />
      
      {/* Trophy Icon */}
      <div className="flex-shrink-0 relative z-10">
        <div className="w-12 h-12 bg-secondary-foreground/20 rounded-full flex items-center justify-center shadow-md animate-bounce">
          <span className="text-2xl animate-pulse">🏆</span>
        </div>
      </div>
      
      {/* Badge Info */}
      <div className="flex-1 min-w-0 relative z-10">
        <h3 className="font-bold text-secondary-foreground text-lg leading-tight animate-bounceIn">
           {newBadge.LvlId - prevBadge.LvlId == 0 ? "Таны цолны явц нэмэгдлээ!" : `Та цолны түвшин ${newBadge.LvlId} болж ахилаа!`}
        </h3>
        <p className="text-secondary-foreground/90 font-semibold text-sm mt-1 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {newBadge.BadgeName}
        </p>
        <p className="text-secondary-foreground/70 text-xs mt-1 line-clamp-2 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          {newBadge.BadgeDescription}
        </p>
        {newBadge.LvlName && (
          <div className="mt-2 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <span className="inline-block bg-secondary-foreground/20 text-secondary text-xs px-2 py-1 rounded-full font-medium shadow-sm animate-pulse">
              Level {newBadge.LvlId}: {newBadge.LvlName}
            </span>
          </div>
        )}
      </div>
      
      {/* Badge Image */}
      {newBadge.BadgeImageUrl && (
        <div className="flex-shrink-0 animate-bounceIn relative z-10" style={{ animationDelay: '0.8s' }}>
          <img 
            src={newBadge.BadgeImageUrl} 
            alt={newBadge.BadgeName}
            className="w-12 h-12 rounded-lg object-cover border-2 border-secondary-foreground/30 shadow-md hover:scale-110 transition-transform duration-200"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      )}
    </div>
  );
};

export const messageHandlers: Record<MessageType, (data: any) => void> = {
  BADGE: (data: BadgeData) => {
    console.log("🏆 Badge:", data);
    toast.custom(customToast(data), {
      duration: 5000,
      position: 'top-right',
      style: {
        animation: 'slideInRight 0.5s ease-out',
      },
      className: 'animate-slideInRight',
    })
  },
  SYSTEM_ALERT: (data) => {
    console.log("⚠️ System alert:", data);
  },
};
