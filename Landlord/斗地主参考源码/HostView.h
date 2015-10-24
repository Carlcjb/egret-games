// HostView.h : CHostView ��Ľӿ�
//


#pragma once

#define WM_ON_SENDCARD  (WM_USER+103)

class CHostView : public CView
{
protected: // �������л�����
	CHostView();
	DECLARE_DYNCREATE(CHostView)

// ����
public:
	CHostDoc* GetDocument() const;

// ����
public:
 int m_cardNum;
// ��д
public:
	virtual void OnDraw(CDC* pDC);  // ��д�Ի��Ƹ���ͼ
	virtual BOOL PreCreateWindow(CREATESTRUCT& cs);
protected:
//	virtual BOOL OnPreparePrinting(CPrintInfo* pInfo);
//	virtual void OnBeginPrinting(CDC* pDC, CPrintInfo* pInfo);
//	virtual void OnEndPrinting(CDC* pDC, CPrintInfo* pInfo);

// ʵ��
public:
	  RECT m_clientRect;
	virtual ~CHostView();
#ifdef _DEBUG
	virtual void AssertValid() const;
	virtual void Dump(CDumpContext& dc) const;
#endif

protected:
  
// ���ɵ���Ϣӳ�亯��
protected:
	DECLARE_MESSAGE_MAP()
public:
	afx_msg void OnLButtonDown(UINT nFlags, CPoint point);
	afx_msg void OnMouseMove(UINT nFlags, CPoint point);
	afx_msg void OnLButtonUp(UINT nFlags, CPoint point);
	afx_msg void OnRButtonDown(UINT nFlags, CPoint point);
	afx_msg LRESULT OnSendMessage(WPARAM wParam, LPARAM lParam); 
public:
	afx_msg void OnTimer(UINT_PTR nIDEvent);
public:
	afx_msg int OnCreate(LPCREATESTRUCT lpCreateStruct);
public:
	afx_msg void OnChar(UINT nChar, UINT nRepCnt, UINT nFlags);
	};

#ifndef _DEBUG  // HostView.cpp �еĵ��԰汾
inline CHostDoc* CHostView::GetDocument() const
   { return reinterpret_cast<CHostDoc*>(m_pDocument); }
#endif

