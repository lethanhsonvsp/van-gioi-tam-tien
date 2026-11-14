import { useEffect, useRef, useState } from 'react';
import { IMPORT_MAX_CHARS, importSave, type ImportResult } from '../core/importSave';
import { serialize, type GameState } from '../core/save';
import { getState, setState } from '../core/store';
import './import.css';

let backup: GameState | null = null; // in-memory copy of the save replaced by the last import (this page session only)
const ARM_MS = 4000;

export function ImportSave({ back }: { back: () => void }) {
  const [text, setText] = useState('');
  const [res, setRes] = useState<ImportResult | null>(null);
  const [armed, setArmed] = useState(false);
  const [note, setNote] = useState<{ ok: boolean; msg: string } | null>(null);
  const [canUndo, setCanUndo] = useState(backup !== null);
  const file = useRef<HTMLInputElement>(null);
  useEffect(() => { if (!armed) return; const t = setTimeout(() => setArmed(false), ARM_MS); return () => clearTimeout(t); }, [armed]);
  const edit = (v: string) => { setText(v); setRes(null); setArmed(false); setNote(null); };
  const saved = (ok: boolean, msg: string) => setNote(ok ? { ok, msg } : { ok, msg: `${msg} Không lưu được vào trình duyệt (bộ nhớ đầy hoặc bị chặn): dữ liệu chỉ nằm trong phiên này, đừng đóng trang.` });
  const pick = (f: File | undefined) => {
    if (!f) return;
    if (f.size > IMPORT_MAX_CHARS) { setRes({ ok: false, error: 'Tệp quá lớn (tối đa 1 MB), không đọc.' }); return; }
    const r = new FileReader(); // local read only, nothing is sent anywhere
    r.onload = () => edit(String(r.result));
    r.onerror = () => setRes({ ok: false, error: 'Không đọc được tệp.' });
    r.readAsText(f);
  };
  const commit = () => {
    if (!res?.ok) return;
    if (!armed) { setArmed(true); return; }
    backup = getState(); setCanUndo(true); setArmed(false);
    saved(setState(res.state), `Đã nhập save của ${res.summary.name}.`);
  };
  const undo = () => { if (backup) { const b = backup; backup = null; setCanUndo(false); saved(setState(b), 'Đã hoàn tác, trở lại save trước khi nhập.'); } };
  return (
    <section className="import" aria-label="Nhập save">
      <h2>Nhập save</h2>
      <textarea className="dump tech" aria-label="Dán chuỗi save" placeholder="Dán chuỗi JSON save vào đây" value={text} onChange={e => edit(e.target.value)} />
      {text && <p className="import-count">Đã dán {text.length.toLocaleString('vi-VN')} ký tự</p>}
      <input ref={file} type="file" accept=".json,application/json" hidden onChange={e => { pick(e.target.files?.[0]); e.target.value = ''; }} />
      <div className="buttons">
        <button className="back" onClick={() => file.current?.click()}>Chọn tệp .json</button>
        <button className="back" disabled={!text.trim()} onClick={() => { setRes(importSave(text)); setArmed(false); setNote(null); }}>Kiểm tra</button>
        <button className="back" disabled={!res?.ok} onClick={commit}>{armed ? 'Bấm lần nữa để ghi đè save hiện tại' : 'Nhập save'}</button>
        {canUndo && <button className="back" onClick={undo}>Hoàn tác nhập</button>}
      </div>
      {res && !res.ok && <p className="import-err" role="alert">Lỗi: {res.error}</p>}
      {res?.ok && !note && <p className="done-note" role="status">Hợp lệ: {res.summary.name}, cấp {res.summary.level}, {res.summary.linhThach} linh thạch, tầng {res.summary.floor}, {res.summary.tienNo} Tiên Nô, save v{res.summary.version}{res.summary.version < getState().version ? ' (sẽ nâng lên bản mới)' : ''}.</p>}
      {note && <p className={note.ok ? 'done-note' : 'import-err'} role={note.ok ? 'status' : 'alert'}>{note.msg} {note.ok && <button className="back" onClick={back}>Xem ở sảnh</button>}</p>}
    </section>
  );
}
