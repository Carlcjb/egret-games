// HostDoc.h : CHostDoc ��Ľӿ�
//


#pragma once


class CHostDoc : public CDocument
{
protected: // �������л�����
	CHostDoc();
	DECLARE_DYNCREATE(CHostDoc)

// ����
public:

// ����
public:

// ��д
public:
	virtual BOOL OnNewDocument();
	virtual void Serialize(CArchive& ar);

// ʵ��
public:
	virtual ~CHostDoc();
#ifdef _DEBUG
	virtual void AssertValid() const;
	virtual void Dump(CDumpContext& dc) const;
#endif

protected:

// ���ɵ���Ϣӳ�亯��
protected:
	DECLARE_MESSAGE_MAP()
};


