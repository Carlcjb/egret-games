// HostDoc.cpp : CHostDoc ���ʵ��
//

#include "stdafx.h"
#include "Host.h"

#include "HostDoc.h"

#ifdef _DEBUG
#define new DEBUG_NEW
#endif


// CHostDoc

IMPLEMENT_DYNCREATE(CHostDoc, CDocument)

BEGIN_MESSAGE_MAP(CHostDoc, CDocument)
END_MESSAGE_MAP()


// CHostDoc ����/����

CHostDoc::CHostDoc()
{
	// TODO: �ڴ����һ���Թ������

}

CHostDoc::~CHostDoc()
{
}

BOOL CHostDoc::OnNewDocument()
{
	if (!CDocument::OnNewDocument())
		return FALSE;

	// TODO: �ڴ�������³�ʼ������
	// (SDI �ĵ������ø��ĵ�)

	return TRUE;
}




// CHostDoc ���л�

void CHostDoc::Serialize(CArchive& ar)
{
	if (ar.IsStoring())
	{
		// TODO: �ڴ���Ӵ洢����
	}
	else
	{
		// TODO: �ڴ���Ӽ��ش���
	}
}


// CHostDoc ���

#ifdef _DEBUG
void CHostDoc::AssertValid() const
{
	CDocument::AssertValid();
}

void CHostDoc::Dump(CDumpContext& dc) const
{
	CDocument::Dump(dc);
}
#endif //_DEBUG


// CHostDoc ����
