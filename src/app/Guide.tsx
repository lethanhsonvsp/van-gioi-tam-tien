const SEEN_KEY = 'vgtt.seenGuide';
export const guideSeen = (): boolean => { try { return localStorage.getItem(SEEN_KEY) === '1'; } catch { return true; } };
export const markGuideSeen = (): void => { try { localStorage.setItem(SEEN_KEY, '1'); } catch { /* ignore */ } };

const LINES = [
  'Bạn là nhân vật chính, tu luyện độc lập: tiêu linh thạch ở màn Tu Luyện để lên cấp.',
  'Tiên Nô là các tu sĩ đồng hành, mỗi người một chiêu riêng và một vai trò ngoài chiến đấu.',
  'Quay Gacha bằng thẻ triệu hồi ở màn Tiên Nô; có bảo đảm hiếm sau một số lần quay.',
  'Vào Tổ Đội để xếp đội 6 người: bạn ở ô đầu, thêm tối đa 5 Tiên Nô.',
  'Thí Luyện 20 tầng tự đánh. Thắng tầng đầu nhận thưởng đủ, đánh lại chỉ nhận ít dần.',
  'Thưởng gồm linh thạch, EXP và thẻ triệu hồi: dùng để Tu Luyện và quay thêm Tiên Nô.',
  'Game lưu tự động trong trình duyệt này; xóa dữ liệu trình duyệt sẽ mất save (xuất save ở Cài Đặt).',
];

export function Guide({ close }: { close: () => void }) {
  const done = () => { markGuideSeen(); close(); };
  return (
    <div className="modal" onClick={done}>
      <div className="profile-card guide" onClick={e => e.stopPropagation()}>
        <div className="info">
          <h2>Hướng dẫn</h2>
          <ol>{LINES.map(l => <li key={l}>{l}</li>)}</ol>
          <button className="back" onClick={done}>Đã hiểu</button>
        </div>
      </div>
    </div>
  );
}
