import React from 'react';
import { useTranslation } from 'react-i18next';
import { GlassCard, Button } from '@/components/UI';
import { MessageCircle, Heart, Share2, Plus, Image as ImageIcon } from 'lucide-react';
import { useStore } from '@/store/useStore';

const POST_KEYS = ['p1', 'p2'] as const;

const POST_IMAGES: Record<string, string | undefined> = {
  p1: 'https://picsum.photos/seed/post1/600/400',
  p2: undefined,
};

const Community = () => {
  const { t } = useTranslation();
  const { user } = useStore();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t('community.title')}</h1>
          <p className="text-slate-500">{t('community.subtitle')}</p>
        </div>
        <Button icon={Plus}>{t('community.newPost')}</Button>
      </div>

      <GlassCard className="flex gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
          <img src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName}`} alt={t('community.meAlt')} />
        </div>
        <div className="flex-1 space-y-4">
          <textarea
            placeholder={t('community.placeholder')}
            className="w-full bg-transparent border-none focus:ring-0 text-lg resize-none"
            rows={2}
          />
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <div className="flex gap-4 text-slate-400">
              <button type="button" className="hover:text-primary transition-colors">
                <ImageIcon size={20} />
              </button>
              <button type="button" className="hover:text-primary transition-colors">
                <MessageCircle size={20} />
              </button>
            </div>
            <Button className="py-2 px-6 text-sm">{t('community.post')}</Button>
          </div>
        </div>
      </GlassCard>

      <div className="space-y-6">
        {POST_KEYS.map((key) => {
          const author = t(`community.posts.${key}.author`);
          const content = t(`community.posts.${key}.content`);
          const time = t(`community.posts.${key}.time`);
          const image = POST_IMAGES[key];
          const likes = key === 'p1' ? 124 : 85;
          const comments = key === 'p1' ? 18 : 32;

          return (
            <GlassCard key={key} className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(author)}`} alt="" />
                  </div>
                  <div>
                    <div className="font-bold">{author}</div>
                    <div className="text-xs text-slate-400">{time}</div>
                  </div>
                </div>
                <Button variant="ghost" className="p-2">
                  <Share2 size={18} />
                </Button>
              </div>

              <p className="text-slate-700 leading-relaxed">{content}</p>

              {image && (
                <div className="rounded-2xl overflow-hidden">
                  <img src={image} alt={t('community.postAlt')} className="w-full h-auto" />
                </div>
              )}

              <div className="flex items-center gap-6 pt-4 border-t border-slate-100">
                <button type="button" className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors">
                  <Heart size={20} /> <span className="font-bold">{likes}</span>
                </button>
                <button type="button" className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors">
                  <MessageCircle size={20} /> <span className="font-bold">{comments}</span>
                </button>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
};

export default Community;
