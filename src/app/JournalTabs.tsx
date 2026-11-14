import { SKILLS } from '../content';
import { elementLabel } from '../content/elements';
import { basicPower, codexEntries, kindGuides, rarityRows, seenCount, statusTurns, type CodexEntry } from '../core/codex';
import { useGame } from './useGame';
import { Emblem } from './Card';

const row = (v: number[]) => (Math.min(...v) === Math.max(...v) ? `${v[0]}` : `${Math.min(...v)}–${Math.max(...v)}`);

function Entry({ e }: { e: CodexEntry }) {
  const t = e.tienNo, kit = SKILLS.kits[t.id];
  return (
    <li className={`jentry r-${t.rarity}${e.seen ? '' : ' locked'}`}>
      <Emblem element={t.element} className="jemblem" />
      <div className="jtext">
        <h3>{t.name} <span className="jrar">{t.rarity}</span></h3>
        {e.seen ? (
          <>
            <p className="jsub">{t.title}</p>
            <p>{elementLabel(t.element)} · Cấp {e.level} · Số bản đã có: {e.copies}</p>
            <p><b>Ngoài chiến đấu:</b> {t.roleVi}</p>
            <p><b>Chiêu:</b> {kit ? `${kit.name} (${kit.tag})` : t.combatVi}. {t.combatVi}.</p>
          </>
        ) : (
          <>
            <p className="jsub">Chưa gặp</p>
            <p>Triệu hồi ở màn Tiên Nô để biết thêm.</p>
          </>
        )}
      </div>
    </li>
  );
}

export function TienNoTab() {
  const g = useGame();
  return (
    <>
      <p className="jtotal">Đã gặp <b>{seenCount(g)}/{codexEntries(g).length}</b> Tiên Nô</p>
      <ul className="jgrid">{codexEntries(g).map(e => <Entry key={e.tienNo.id} e={e} />)}</ul>
    </>
  );
}

const KIND_VI = { damage: ['Sát thương', 'Đánh thẳng vào mục tiêu, có thể hút máu hoặc mạnh dần theo thời gian.'], support: ['Hồi máu và khiên', 'Hồi máu, dựng khiên hoặc thanh tẩy trạng thái xấu cho đồng đội.'], control: ['Khống chế', 'Gây sát thương nhẹ và áp trạng thái khống chế lên mục tiêu.'] } as const;
const STATUS_VI = [
  ['stun', 'Choáng', 'Mất lượt hành động, không tích được nhịp đánh.'],
  ['freeze', 'Đóng băng', 'Đứng yên, không tích được nhịp đánh.'],
  ['slow', 'Làm chậm', 'Tốc độ giảm một nửa trong thời gian hiệu lực.'],
] as const;

export function SkillTab() {
  return (
    <div className="jcols">
      <section>
        <h2>Ba khuôn chiêu</h2>
        <p>Đánh thường (ai cũng có): sát thương {basicPower()}× công, ra mỗi lượt. Chiêu đặc trưng của từng Tiên Nô nằm ở tab Tiên Nô.</p>
        {kindGuides().map(k => (
          <article className="jcard" key={k.kind}>
            <h3>{KIND_VI[k.kind][0]}</h3>
            <p>{KIND_VI[k.kind][1]}</p>
            <p className="jnum">{k.count} người dùng · ra chiêu mỗi {row(k.every)} lượt · {k.strength}</p>
          </article>
        ))}
      </section>
      <section>
        <h2>Trạng thái khống chế</h2>
        {STATUS_VI.map(([id, name, text]) => (
          <article className="jcard" key={id}>
            <h3>{name}</h3>
            <p>{text}</p>
            <p className="jnum">Hiệu lực khoảng {row(statusTurns(id))} lượt{id === 'slow' ? ' (tốc độ giảm một nửa)' : ''}.</p>
          </article>
        ))}
      </section>
    </div>
  );
}

const MEANING: Record<string, string> = {
  N: 'Nhân vật chính, quái và trang bị. Không có trong Triệu hồi.',
  R: 'Nền tảng vững, dễ gặp nhất.',
  SR: 'Tiềm năng cao, có bảo đảm sau một số lần triệu hồi.',
  SSR: 'Tiềm năng rất cao, hiếm.',
  UR: 'Tiềm năng tối thượng, có bảo đảm dài hơn.',
};

export function RarityTab() {
  return (
    <>
      <p className="jtotal">Cùng cấp, độ hiếm cao mạnh hơn.</p>
      <table className="jtable">
        <thead><tr><th>Độ hiếm</th><th>Ý nghĩa</th><th>Hệ số chỉ số</th><th>Mỗi cấp</th><th>Trần cấp</th></tr></thead>
        <tbody>
          {rarityRows().map(r => (
            <tr key={r.rarity} className={`r-${r.rarity}`}>
              <th scope="row">{r.rarity}</th><td>{MEANING[r.rarity]}</td>
              <td>×{r.multiplier.toFixed(2)}</td><td>+{r.perLevelPct}% chỉ số gốc</td><td>{r.capBonus ? `+${r.capBonus}` : 'không cộng'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="jnote">Trần cấp Tiên Nô = cấp nhân vật chính + số cộng theo độ hiếm (cộng thêm +1 mỗi bản trùng, có giới hạn).</p>
    </>
  );
}
